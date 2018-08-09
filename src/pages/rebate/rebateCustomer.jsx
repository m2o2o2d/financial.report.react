import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from '@/api/api';
import { initData } from '@/store/rebate/customer/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Modal, Table } from 'antd';
import EditableTable from '@/components/editableTable/editableTable';
import './rebateCustomer.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class RebateCustomer extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired,
	};

	state = {
		newItems: {}, // rowKey:row
		newForms: {}, // rowKey:form
	};

	tableProperty = {
		size: "small"
	};

	componentDidMount() {
		this.initData();
	}

	initData = () => {
		const columns = this.decorateColumns(API.getRebateCustomerCols());
		this.props.initData(columns);
	};

	decorateColumns = (columns) => {
		for(const col of columns) {
			switch(col.key) {
				case "customerCode":
					col.editable = true;
					break;
				case "customerName":
					col.editable = false;
					break;
				case "rebMonthRuleCode":
					col.editable = true;
					break;
				case "rebYearRuleCode":
					col.editable = true;
					break;
				default:;
			}
		}
		return columns;
	};

	check = () => {
		const entries = Object.entries(this.state.newForms);
		const data = [];
		let hasError = false;
		for(const entry of entries) {
			entry[1].validateFields((err) => {
				if(!err) {
					const fieldsValue = entry[1].getFieldsValue();
					data.push({key: entry[0], ...fieldsValue});
					
				} else {
					hasError = true;
					console.log("err:", err);
				}
			});
		}
		return {
			hasError: hasError,
			data: data
		};
	};

	handleAdd = () => {
		const key = "" + (this.props.items.length + Object.keys(this.state.newItems).length + 1); //TODO
		const newItem = {
			key: key,
			customerCode: "",
			customerName: "",
			rebMonthRuleCode: "",
			rebYearRuleCode: "",
		};
		this.setState({
			newItems:{...this.state.newItems, [key]:newItem}
		});
	};

	handleSave = () => {
		const { hasError, data } = this.check();
		if(!hasError && data && data.length > 0) {
			this.setState({newItems: [], newForms: []});
			this.props.save(data);
		}
	};

	handleCancel = () => {
		this.setState({newItems: [], newForms: []});
	};

	onRow = (record, index) => {
		return {
			wrappedComponentRef: (instance) => {
				if(instance) {
					const { 'data-row-key': rowKeyValue, form } = instance.props;
					const { newForms, newItems } = this.state;
					if(!newForms[rowKeyValue] && newItems[rowKeyValue]) {
						this.setState({
							newForms: {...newForms, [rowKeyValue]: form}
						});
					}
				}
			}
		};
	};

	render() {
		const { items, columns } = this.props;
		const tableProperty = this.tableProperty;
		const editingKeys = Object.keys(this.state.newItems);
		const newItems = Object.values(this.state.newItems);
		return (
			<Content className="mainContent" id="rebateCustomer">
				{/*----------------------------filter----------------------------*/}
				<Collapse bordered={true}>
		      		<Panel key="filter" header="筛选条件">
						<Form
				      		layout="inline"
							onSubmit={this.handleSearch}
				      	>	
				      		<FormItem label="客户编码：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="客户名称：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="月度返利规则：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="年度返利规则：">
				      			<Input />
				      		</FormItem>
				      		<FormItem><Button type="primary" onClick={this.handleSearch}>查询</Button></FormItem>
				      		<FormItem><Button type="default" onClick={this.handldeReset}>重置</Button></FormItem>
				      	</Form>
		      		</Panel>
		      	</Collapse>
				<div className="toolbar">
		      		{ newItems.length < 1 ? (<Button size="small" type="default">导出</Button>) : null}
		      		{ newItems.length < 1 ? (<Button size="small" type="default">打印</Button>) : null}
		      		{ newItems.length < 1 ? (<Button size="small" type="danger">删除</Button>) : null}
		      		{ newItems.length > 0 ? (<Button size="small" type="default" onClick={this.handleCancel}>取消</Button>) : null}
		      		{ newItems.length > 0 ? (<Button size="small" type="default" onClick={this.handleSave}>保存</Button>) : null}
		      		<Button size="small" type="primary" onClick={this.handleAdd}>创建</Button>
		      	</div>
				<EditableTable {...tableProperty} rowKey="key" dataSource={[...newItems, ...items]} columns={columns} editingKeys={editingKeys}/>
			</Content>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.rebateCustomer && state.rebateCustomer.items || null,
	columns: state.rebateCustomer && state.rebateCustomer.columns || null
});

const mapDispatchToProps = {
	initData
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateCustomer));