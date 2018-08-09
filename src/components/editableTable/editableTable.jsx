/**
 * EditableTable component
 * - dataSource: {array} dataSource of the table
 * - columns: {array} columns of the table
 * 		- key
 *		- dataIndex
 *		- inputType: 'text'(default) | 'number'
 *		- title
 		- editable: false (default) | true
 * 	 !!! onCell would be overwrote
 * - editingKeys: {array} row keys of editing rows
 * - onRow(): listen to row change which can be used to get row form instance
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import './editableTable.less';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
	<EditableContext.Provider value={form}>
    	<tr {...props} />
	</EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {

	getInput = () => {
		if(this.props.inputType === 'number') {
			return <InputNumber />;
		}
		return <Input />;
	};

	render() {
		const { editing, dataIndex, title, inputType, record, index, ...restProps } = this.props;
		return (
			<EditableContext.Consumer>
				{ (form) => {
					const { getFieldDecorator } = form;
					return (
						<td {...restProps}>
							{ editing ? (
								<FormItem style={{margin:0}}>
									{ getFieldDecorator(dataIndex, {
										rules: [
											{required:true, message: `请输入${title}`}
										],
										initialValue: record[dataIndex]
									})(this.getInput())}
								</FormItem>
							) : restProps.children}
						</td>
					);
				}}
			</EditableContext.Consumer>
		);
	}
}

class EditableTable extends Component {

	static propTypes = {
		dataSource: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired,
		editingKeys: PropTypes.array,
		save: PropTypes.func
	};

	state = {
		newItems: {}
	};

	isEditing = (record) => {
		return this.props.editingKeys.find((key) => record.key || record[this.props.rowKey] === key) !== undefined;
	};
	
	render() {
		const { dataSource, columns, ...rest } = this.props;
		const editComponents = {
			body: {
				row: EditableFormRow,
				cell: EditableCell
			}
		};
		const mappedCols = columns.map((col) => {
			if(!col.editable) {
				return col;
			}
			return {
				...col,
				onCell: record => ({
					record,
					inputType: col.inputType || 'text',
					dataIndex: col.dataIndex,
					title: col.title,
					editing: this.isEditing(record)
				})
			};
		});
		return (
			<Table
				{...rest}
				components={editComponents}
				dataSource={dataSource}
				columns={mappedCols}
				rowClassName="editable-row"
			/>
		);
	}
}

export default EditableTable;