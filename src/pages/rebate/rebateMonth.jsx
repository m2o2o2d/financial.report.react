import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initData, save } from '@/store/rebate/month/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Modal, Table } from 'antd';
import EditableTable from '@/components/editableTable/editableTable';
import './rebateMonth.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class RebateMonth extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired
	};

	state = {
		newItems: {} // rowKey:row
	};

	componentDidMount() {
		this.props.initData();
	}

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
		const data = Object.values(this.state.newItems);
		this.setState({newItems: []});
		this.props.save(data);
	};

	handleCancel = () => {
		this.setState({newItems: []});
	};

	onRow = (record, index) => {
		return {
			onChange: (changedFields) => {
				if(changedFields) {
					const rowKeyValue = record['rebMonthRuleCode'];
					let newRecord = this.state.newItems[rowKeyValue] || record;
					const newItems = this.state.newItems; 
					const entries = Object.entries(changedFields);
					for(const entry of entries) {
						if(entry[1].validating === false) {
							newRecord = {...newRecord, [entry[0]]: entry[1].value};
						}
					}
					this.setState({
						newItems: {...newItems, [rowKeyValue]: newRecord}
					});
				}
			}
		};
	};

	render() {
		const { items, columns} = this.props;
		const editingKeys = Object.keys(this.state.newItems);
		const newItems = Object.values(this.state.newItems);
		return (
			<Content className="mainContent">
				{/*----------------------------filter----------------------------*/}
				<Collapse defaultActiveKey="filter" bordered={true}>
		      		<Panel key="filter" header="筛选条件">
						<Form
				      		layout="inline"
							onSubmit={this.handleSearch}
				      	>	
				      		<FormItem label="月度返利编码：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="返利规则描述：">
				      			<Input />
				      		</FormItem>
				      		<FormItem label="基准单价(元)：">
				      			<InputNumber defaultValue="10"/>
				      		</FormItem>
				      		<FormItem label="最大价差(元)：">
				      			<InputNumber defaultValue="10"/>
				      		</FormItem>
				      		<FormItem label="适用年度：">
				      			<InputNumber defaultValue="2018"/>
				      		</FormItem>
				      		<FormItem><Button type="primary" onClick={this.handleSearch}>查询</Button></FormItem>
				      		<FormItem><Button type="default" onClick={this.handldeReset}>重置</Button></FormItem>
				      	</Form>
		      		</Panel>
		      	</Collapse>
				{/*----------------------------toolbar----------------------------*/}
				<div className="toolbar">
		      		{ newItems.length < 1 ? (<Button type="default">导出</Button>) : null}
		      		{ newItems.length < 1 ? (<Button type="default">打印</Button>) : null}
		      		{ newItems.length < 1 ? (<Button type="default">删除</Button>) : null}
		      		{ newItems.length > 0 ? (<Button type="default" onClick={this.handleCancel}>取消</Button>) : null}
		      		{ newItems.length > 0 ? (<Button type="default" onClick={this.handleSave}>保存</Button>) : null}
		      		<Button type="default" onClick={this.handleAdd}>创建</Button>
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