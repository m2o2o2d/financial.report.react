import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from '@/api/api';
import { initData, save, getRebateMonthCols } from '@/store/rebate/month/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Table, Tabs } from 'antd';
import EditableTable from '@/components/editableTable/editableTable';
import './rebateMonth.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { TabPane } = Tabs;

class RebateMonthFilter extends Component {

	static propsTypes = {
		search: PropTypes.func.isRequired,
		reset: PropTypes.func.isRequired
	};
	
	handleSearch = () => {
		this.props.form.validateFields((err) => {
			if(!err) {
				const fieldsValue = this.props.form.getFieldsValue();
				this.props.search(fieldsValue);
			}
		});
	};

	handleReset = () => {
		this.props.form.resetFields();
		// this.props.reset();
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
		columns: PropTypes.array.isRequired,
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
		},
		selectedRowKeys: [],
		materialCols: [],
		materialData: [],
		newMatItems: {},
		newMatForms: {},
		customerCols: [],
		customerData: [],
		newCusItems: {},
		newCusForms: {},
	};

	componentDidMount() {
		this.initData();
	}
	
	initData = () => {
		const columns = this.decorateColumns(this.props.getRebateMonthCols());
		this.setState({materialCols: API.getRebateMaterialCols()});
		this.setState({customerCols: API.getRebateCustomerCols()});
		this.props.initData(columns);
	};
	
	/* Set table column properties */
	decorateColumns = (columns) => {
		for(const col of columns) {
			switch(col.key) {
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
	
	/* Check new items of table */
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
	
	/* Search table */
	handleFilter = (filteredInfo) => {
		this.setState({
			filteredInfo: {...this.state.filteredInfo, ...filteredInfo}
		});
	};
	
	/* Reset filter */
	handleResetFilter = () => {

	};
	
	/* Add a new item to table */
	handleAdd = () => {
		const rebMonthRuleCode = "M00" + (this.props.items.length + Object.keys(this.state.newItems).length + 1); //TODO
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
		this.setState({
			newItems:{...this.state.newItems, [rebMonthRuleCode]:newItem},
			selectedRowKeys: [rebMonthRuleCode]
		});
	};
	
	/* Save table */
	handleSave = () => {
		const { hasError, data } = this.check();
		if(!hasError && data && data.length > 0) {
			this.setState({newItems: [], newForms: []});
			this.props.save(data);
		}
	};
	
	/* Cancel editing table */
	handleCancel = () => {
		this.setState({newItems: [], newForms: []});
	};
	
	/* Get row forms of table */
	onRow = (record, index) => {
		return {
			onClick: () => {
				this.setState({
			    	selectedRowKeys: [record.rebMonthRuleCode],
			    	materialData: API.getRebateMaterialData("rebMonthRuleCode", [record.rebMonthRuleCode]),
			    	customerData: API.getRebateCustomerData("rebMonthRuleCode", [record.rebMonthRuleCode]),
			    });
			},
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

	handleAddMat = () => {
		const key = API.getRebateMaterialData().length + 1;
		const newItem = {
			key: key,
			cInvCode: "", 
			cInvName: "", 
			cInvStd: "", 
			rebMonthRuleCode: this.state.selectedRowKeys[0],
			rebYearRuleCode: 0
		};
		this.setState({
			newMatItems: {[key]: newItem, ...this.state.newMatItems}
		});
	};

	handleSaveMat = () => {
		// const { hasError, data } = this.checkMat();
		// if(!hasError && data && data.length > 0) {
		// 	this.setState({newMatItems: [], newMatForms: []});
		// 	API.saveRebateMaterialData(data);
		// }
	};

	handleCancelMat = () => {
		this.setState({
			newMatItems: {}
		});
	};

	// checkMat = () => {
	// 	const entries = Object.entries(this.state.newMatForms);
	// 	const data = [];
	// 	let hasError = false;
	// 	for(const entry of entries) {
	// 		entry[1].validateFields((err) => {
	// 			if(!err) {
	// 				const fieldsValue = entry[1].getFieldsValue();
	// 				data.push({key: entry[0], rebMonthRuleCode: this.state.selectedRowKeys[0], ...fieldsValue});
	// 			} else {
	// 				hasError = true;
	// 				console.log("err:", err);
	// 			}
	// 		});
	// 	}
	// 	return {
	// 		hasError: hasError,
	// 		data: data
	// 	};
	// };

	// onMatRow = (record, index) => {
	// 	return {
	// 		wrappedComponentRef: (instance) => {
	// 			if(instance) {
	// 				const { 'data-row-key': rowKeyValue, form } = instance.props;
	// 				const { newMatForms, newMatItems } = this.state;
	// 				if(!newMatForms[rowKeyValue] && newMatItems[rowKeyValue]) {
	// 					this.setState({
	// 						newForms: {...newMatForms, [rowKeyValue]: form}
	// 					});
	// 				}
	// 			}
	// 		}
	// 	};
	// };

	handleAddCus = () => {
		const key = API.getRebateCustomerData().length + 1;
		const newItem = {
			key: key,
			customerCode: "", 
			customerName: "",
			rebMonthRuleCode: this.state.selectedRowKeys[0],
			rebYearRuleCode: 0
		};
		this.setState({
			newCusItems: {[key]: newItem, ...this.state.newCusItems}
		});
	};

	handleSaveMat = () => {
		// const { hasError, data } = this.checkMat();
		// if(!hasError && data && data.length > 0) {
		// 	this.setState({newMatItems: [], newMatForms: []});
		// 	API.saveRebateMaterialData(data);
		// }
	};

	handleCancelCus = () => {
		this.setState({
			newCusItems: {}
		});
	};

	render() {
		const { items, columns } = this.props;
		const editingKeys = Object.keys(this.state.newItems);
		const newItems = Object.values(this.state.newItems);
		const selectedRowKeys = this.state.selectedRowKeys;
		const newMatItems = Object.values(this.state.newMatItems);
		const matEditingKeys = Object.keys(this.state.newMatItems);
		const newCusItems = Object.values(this.state.newCusItems);
		const cusEditingKeys = Object.keys(this.state.newCusItems);
		return (
			<Content className="mainContent" id="rebateMonth">
				{/*----------------------------filter----------------------------*/}
				<Collapse  bordered={true}>
		      		<Panel key="filter" header="筛选条件">
						<RebateMonthFormFilter search={this.handleFilter} reset={this.handleResetFilter}/>
		      		</Panel>
		      	</Collapse>
				{/*----------------------------toolbar----------------------------*/}
				<div className="toolbar">
		      		{ newItems.length < 1 ? (<Button size="small" type="default">导出</Button>) : null}
		      		{ newItems.length < 1 ? (<Button size="small" type="default">打印</Button>) : null}
		      		{ newItems.length < 1 ? (<Button size="small" type="danger">删除</Button>) : null}
		      		{ newItems.length > 0 ? (<Button size="small" type="default" onClick={this.handleCancel}>取消</Button>) : null}
		      		{ newItems.length > 0 ? (<Button size="small" type="default" onClick={this.handleSave}>保存</Button>) : null}
		      		<Button size="small" type="primary" onClick={this.handleAdd}>创建</Button>
		      	</div>
		      	{/*----------------------------table----------------------------*/}
		      	<EditableTable onRow={this.onRow} rowKey="rebMonthRuleCode" dataSource={[...newItems, ...items]} columns={columns} editingKeys={editingKeys} size="small" pagination={false} scroll={{ y: 260 }}/>
		      	{/*----------------------------tabs----------------------------*/}
		      	<Tabs defaultActiveKey="1" size="small" className="tabs">
		      		{/*----------------------------material----------------------------*/}
          			<TabPane tab="适用产品" key="1">
		      			<div className="toolbar">
				      		{ newItems.length < 1 && selectedRowKeys.length > 0 && matEditingKeys.length > 0 ? (<Button type="default" size="small" onClick={this.handleCancelMat}>取消</Button>) : null}
				      		{ newItems.length < 1 && selectedRowKeys.length > 0 && matEditingKeys.length > 0 ? (<Button type="default" size="small" onClick={this.handleSaveMat}>保存</Button>) : null}
				      		{ newItems.length < 1 && selectedRowKeys.length > 0 ? (<Button type="default" size="small" onClick={this.handleAddMat}>添加产品</Button>) : null}
				      	</div>
				      	<EditableTable rowKey="key" dataSource={[...newMatItems, ...this.state.materialData]} columns={this.state.materialCols} editingKeys={matEditingKeys} size="small" pagination={false}/>
          			</TabPane>
          			{/*----------------------------customer----------------------------*/}
          			<TabPane tab="适用客户" key="2">
          				<div className="toolbar">
				      		{ newItems.length < 1 && selectedRowKeys.length > 0 && cusEditingKeys.length > 0 ? (<Button type="default" size="small" onClick={this.handleCancelCus}>取消</Button>) : null}
				      		{ newItems.length < 1 && selectedRowKeys.length > 0 && cusEditingKeys.length > 0 ? (<Button type="default" size="small" onClick={this.handleSaveCus}>保存</Button>) : null}
				      		{ newItems.length < 1 && selectedRowKeys.length > 0 ? (<Button type="default" size="small" onClick={this.handleAddCus}>添加客户</Button>) : null}
				      	</div>
				      	<EditableTable rowKey="key" dataSource={[...newCusItems, ...this.state.customerData]} columns={this.state.customerCols} editingKeys={cusEditingKeys} size="small" pagination={false}/>
          			</TabPane>
        		</Tabs>
		      	
			</Content>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.rebateMonth && state.rebateMonth.items || [],
	columns: state.rebateMonth && state.rebateMonth.columns || []
});

const mapDispatchToProps = {
	getRebateMonthCols,
	initData,
	save
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateMonth));