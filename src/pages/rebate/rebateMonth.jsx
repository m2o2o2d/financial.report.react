import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initData, addItem } from '@/store/rebate/month/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Modal, Table } from 'antd';
import EditableTable from '@/components/editableTable/editableTable';
import './rebateMonth.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class RebateMonth extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired,
		editingKeys: PropTypes.array
	};

	componentDidMount() {
		this.props.initData();
	}

	handleAdd = () => {
		this.props.addItem(this.props.items, this.props.editingKeys);
	};

	render() {
		const { items, columns, editingKeys } = this.props;
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
		      		<Button type="default">导出</Button>
		      		<Button type="default">打印</Button>
		      		<Button type="default">保存</Button>
		      		<Button type="default">删除</Button>
		      		<Button type="default"onClick={this.handleAdd}>创建</Button>
		      	</div>
		      	{/*----------------------------table----------------------------*/}
		      	<EditableTable rowKey="rebMonthRuleCode" dataSource={items} columns={columns} editingKeys={editingKeys} />
			</Content>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.rebateMonth && state.rebateMonth.items || null,
	columns: state.rebateMonth && state.rebateMonth.columns || null,
	editingKeys: state.rebateMonth && state.rebateMonth.editingKeys || []
});

const mapDispatchToProps = {
	initData,
	addItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateMonth));