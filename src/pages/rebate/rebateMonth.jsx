import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initData, save } from '@/store/rebate/month/action';
import { Button, Collapse, Form, Input, InputNumber, Layout } from 'antd';
import EditableTable from '@/components/editableTable/editableTable';
import './rebateMonth.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class RebateMonthFilter extends Component {
	
	handleSearch = () => {
		
	};

	handleReset = () => {
		this.props.form.resetFields();
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return(
			<Form layout="inline">	
	      		<FormItem label="月度返利编码：">
	      			{getFieldDecorator('rebMonthRuleCode', {
	      				rules: [],
	      			})(
						<Input />
	      			)}
	      		</FormItem>
	      		<FormItem label="返利规则描述：">
	      			{getFieldDecorator('rebMonthRuleDesc', {
	      				rules: [],
	      			})(
						<Input />
	      			)}
	      		</FormItem>
	      		<FormItem label="基准单价(元)：">
	      			{getFieldDecorator('rebBaseUnitPrice', {
	      				rules: [],
	      				initialValue: 10
	      			})(
						<InputNumber />
	      			)}
	      		</FormItem>
	      		<FormItem label="最大价差(元)：">
	      			{getFieldDecorator('rebMinPriceGap', {
	      				rules: [],
	      				initialValue: 10
	      			})(
						<InputNumber />
					)}
	      		</FormItem>
	      		<FormItem label="适用年度：">
	      			{getFieldDecorator('rebValidYear', {
	      				rules: [],
	      				initialValue: 2018
	      			})(
						<InputNumber />
					)}
	      		</FormItem>
	      		<FormItem><Button type="primary" onClick={this.handleSearch}>查询</Button></FormItem>
	      		<FormItem><Button type="default" onClick={this.handleReset}>重置</Button></FormItem>
	      	</Form>
		);
	}
}
const RebateMonthFormFilter = Form.create()(RebateMonthFilter);

class RebateMonth extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired
	};

	state = {
		newItems: {}, // rowKey:row
		newForms: {}, // rowKey:form
		filteredInfo: {
			rebMonthRuleCode: "",
			rebMonthRuleDesc: "",
			rebBaseUnitPrice: 0,
			rebMinPriceGap: 0,
			rebValidYear: 2018
		}
	};

	componentDidMount() {
		this.props.initData();
	}

	decorateColumns = () => {
		const columns = this.props.columns;
		for(const col of columns) {
			switch(col.dataIndex) {
				case "rebMonthRuleCode":
					col.filteredValue = this.state.rebMonthRuleCode;
					col.onFilter = (value, record) => record.rebMonthRuleCode.includes(value);
					break;
				case "rebMonthRuleDesc":
					col.filteredValue = this.state.rebMonthRuleDesc;
					col.onFilter = (value, record) => record.rebMonthRuleDesc.includes(value);
					break;
				case "rebBaseUnitPrice":
					col.filteredValue = this.state.rebBaseUnitPrice;
					col.onFilter = (value, record) => record.rebBaseUnitPrice === value;
					break;
				case "rebMinPriceGap":
					col.filteredValue = this.state.rebMinPriceGap;
					col.onFilter = (value, record) => record.rebMinPriceGap === value;
					break;
				case "rebValidYear":
					col.filteredValue = this.state.rebValidYear;
					col.onFilter = (value, record) => record.rebValidYear === value;
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
					data.push({rebMonthRuleCode: entry[0], ...fieldsValue});
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

	handleFilter = (e) => {
		
	};

	handleAdd = () => {
		const rebMonthRuleCode = "M-00" + (this.props.items.length + Object.keys(this.state.newItems).length + 1); //TODO
		const newItem = {
			rebMonthRuleCode: rebMonthRuleCode, 
			rebMonthRuleDesc: "", 
			rebBaseUnitPrice: 0, 
			rebMinPriceGap: 0, 
			rebValidYear: 0, 
			rebBonusLev1: 0,
			rebBonusLev2: 0,
			rebBonusLev3: 0
		};
		this.setState({newItems:{...this.state.newItems, [rebMonthRuleCode]:newItem}});
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
				// store the props.form of each row
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
		const editingKeys = Object.keys(this.state.newItems);
		const newItems = Object.values(this.state.newItems);
		return (
			<Content className="mainContent">
				{/*----------------------------filter----------------------------*/}
				<Collapse defaultActiveKey="filter" bordered={true}>
		      		<Panel key="filter" header="筛选条件">
						<RebateMonthFormFilter />
		      		</Panel>
		      	</Collapse>
				{/*----------------------------toolbar----------------------------*/}
				<div className="toolbar">
		      		{ newItems.length < 1 ? (<Button type="default">导出</Button>) : null}
		      		{ newItems.length < 1 ? (<Button type="default">打印</Button>) : null}
		      		{ newItems.length < 1 ? (<Button type="danger">删除</Button>) : null}
		      		{ newItems.length > 0 ? (<Button type="default" onClick={this.handleCancel}>取消</Button>) : null}
		      		{ newItems.length > 0 ? (<Button type="default" onClick={this.handleSave}>保存</Button>) : null}
		      		<Button type="primary" onClick={this.handleAdd}>创建</Button>
		      	</div>
		      	{/*----------------------------table----------------------------*/}
		      	<EditableTable onRow={this.onRow} rowKey="rebMonthRuleCode" dataSource={[...items, ...newItems]} columns={columns} editingKeys={editingKeys} />
			</Content>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.rebateMonth && state.rebateMonth.items || [],
	columns: state.rebateMonth && state.rebateMonth.columns || []
});

const mapDispatchToProps = {
	initData,
	save
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateMonth));