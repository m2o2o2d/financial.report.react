import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import API from '@/api/api';
import { initData, save } from '@/store/rebate/year/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Modal, Table, Tabs } from 'antd';
import EditableTable from '@/components/editableTable/editableTable';
import './rebateYear.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;
const { TabPane } = Tabs;

class RebateYear extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired
	};

	state = {
		newItems: {}, // rowKey:row
		newForms: {}, // rowKey:form
		selectedRowKeys: [],
		newSubRules: {},
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
		const columns = this.decorateColumns(API.getRebateYearCols());
		this.setState({materialCols: API.getRebateMaterialCols()});
		this.setState({customerCols: API.getRebateCustomerCols()});
		this.props.initData(columns);
	};

	decorateColumns = (columns) => {
		return [...columns, 
			{
				key: 'operation',
				title: '操作',
				render: (record) => (
					<span className="table-operation">
						<a onClick={() => this.handleAddSubRule(record)}>添加规则</a>
						<a onClick={() => this.handleCancelSubRule(record)}>取消</a>
					</span>
				)
			}
		];
	};

	expandedRowRender = (record, index, indent, expanded) => {
		const columns = API.getRebateYearCols("detail");
		const data = API.getRebateYearData("detail", record.rebYearRuleCode)||[];
		const newSubRules = Object.values(this.state.newSubRules[record.rebYearRuleCode]||{});
		const subRuleEditingKeys = Object.keys(this.state.newSubRules[record.rebYearRuleCode]||{}) || [];
		return (
	      	<EditableTable className="noBorderTable" rowKey="rebYearRuleIndex" columns={columns} dataSource={[...newSubRules,...data]} editingKeys={subRuleEditingKeys} pagination={false} size="small"/>
	    );
	};

	check = () => {
		const entries = Object.entries(this.state.newForms);
		const data = [];
		let hasError = false;
		for(const entry of entries) {
			entry[1].validateFields((err) => {
				if(!err) {
					const fieldsValue = entry[1].getFieldsValue();
					data.push({rebYearRuleCode: entry[0], ...fieldsValue});
					
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
		const rebYearRuleCode = "Y00" + (this.props.items.length + Object.keys(this.state.newItems).length + 1); //TODO
		const newItem = {
			rebYearRuleCode: rebYearRuleCode,
			rebValidYear: 0, 
			rules: []
		};
		this.setState({
			newItems:{...this.state.newItems, [rebYearRuleCode]:newItem},
			selectedRowKeys: [rebYearRuleCode]
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
			onClick: () => {
				this.setState({
			    	selectedRowKeys: [record.rebYearRuleCode],
			    	materialData: API.getRebateMaterialData("rebYearRuleCode", [record.rebYearRuleCode]),
			    	customerData: API.getRebateCustomerData("rebYearRuleCode", [record.rebYearRuleCode]),
			    });
			},
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

	handleAddSubRule = (record) => {
		const newSubRules = this.state.newSubRules[record.rebYearRuleCode];
		const newSubRulesLength = newSubRules === undefined ? 0 : Object.keys(newSubRules).length;
		const rebYearRuleIndex = "" + (record.rules.length + newSubRulesLength + 1);
		const newItem = {
			rebYearRuleIndex: rebYearRuleIndex,
			rebYearRuleDesc: 0, 
			rebRevLowerLimit: 0,
			rebRebUpperLimit: 0,
			rebBonusRate: 0,
		};
		this.setState({
			newSubRules:{
				...this.state.newSubRules, 
				[record.rebYearRuleCode]: {
					...this.state.newSubRules[record.rebYearRuleCode],
					[rebYearRuleIndex]:newItem
				}
			},
			selectedRowKeys: [record.rebYearRuleCode]
		});
	};

	handleCancelSubRule = (record) => {
		this.setState({
			newSubRules: {
				...this.state.newSubRules,
				[record.rebYearRuleCode]: {}
			}
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
			<Content className="mainContent" id="rebateYear">
				{/*----------------------------filter----------------------------*/}
				<Collapse bordered={true}>
		      		<Panel key="filter" header="筛选条件">
						<Form
				      		layout="inline"
							onSubmit={this.handleSearch}
				      	>	
				      		<FormItem label="年度返利编码：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="返利规则描述：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="销售额度下限(万元)：">
				      			<InputNumber defaultValue="10"/>
				      		</FormItem>
				      		<FormItem label="销售额度下限(万元)：">
				      			<InputNumber defaultValue="10"/>
				      		</FormItem>
				      		<FormItem label="适用年度：">
				      			<InputNumber defaultValue="2018"/>
				      		</FormItem>
				      		<FormItem label="返利点(%):">
				      			<InputNumber defaultValue="2.5"/>
				      		</FormItem>
				      		<FormItem><Button type="primary" onClick={this.handleSearch}>查询</Button></FormItem>
				      		<FormItem><Button type="default" onClick={this.handldeReset}>重置</Button></FormItem>
				      	</Form>
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
		      	<EditableTable rowKey="rebYearRuleCode" dataSource={[...newItems, ...items]} columns={columns} expandedRowRender={this.expandedRowRender} onRow={this.onRow} editingKeys={editingKeys} className="nestedTable" size="small" pagination={false} scroll={{ y: 260 }}/>
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
	items: state.rebateYear && state.rebateYear.items || null,
	columns: state.rebateYear && state.rebateYear.columns || null
});

const mapDispatchToProps = {
	initData,
	save
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateYear));