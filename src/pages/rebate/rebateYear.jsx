import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initData } from '@/store/rebate/year/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Modal, Table } from 'antd';
import './rebateYear.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class RebateYear extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		columns: PropTypes.array.isRequired
	};

	componentDidMount() {
		this.props.initData();
	}

	render() {
		const { items, columns } = this.props;
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
		      		<Button type="default" shape="circle" icon="minus"></Button>
		      		<Button type="default" shape="circle" icon="plus" onClick={this.handleCreate}></Button>
		      		<Button type="default" shape="circle" icon="export"></Button>
		      		<Button type="default" shape="circle" icon="printer"></Button>
		      	</div>
		      	{/*----------------------------table----------------------------*/}
		      	<Table dataSource={items} columns={columns} />
			</Content>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	items: state.rebateYear && state.rebateYear.items || null,
	columns: state.rebateYear && state.rebateYear.columns || null
});

const mapDispatchToProps = {
	initData
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateYear));