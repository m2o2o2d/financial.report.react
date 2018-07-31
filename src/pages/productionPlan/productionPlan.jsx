import React, { Component } from 'react';
import { Layout, Row, Col, DatePicker, Select, Collapse, Button, Table, Modal, Form } from 'antd';
// import ProductionPlanForm from './productionPlanForm';
import './productionPlan.less';

const { Content } = Layout;
const { RangePicker } = DatePicker;
const Option = Select.Option;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

// Test data
const dataSource = [
	{key: '1',	planCode: 'PV180726001',	plant: '上海',	product: '蟹味菇',	planDate: '2018-07-26',	planVolume: '100',	unit: 'KG',	createdBy: 'Admin',	createdAt: '2018-06-30'}, 
	{key: '2',	planCode: 'PV180726002',	plant: '上海',	product: '白玉菇',	planDate: '2018-07-26',	planVolume: '90',	unit: 'KG',	createdBy: 'Admin',	createdAt: '2018-06-30'}, 
	{key: '3',	planCode: 'PV180726003',	plant: '浙江',	product: '蟹味菇',	planDate: '2018-07-27',	planVolume: '100',	unit: 'KG',	createdBy: 'Admin',	createdAt: '2018-06-30'}, 
	{key: '4',	planCode: 'PV180726004',	plant: '浙江',	product: '白玉菇',	planDate: '2018-07-27',	planVolume: '100',	unit: 'KG',	createdBy: 'Admin',	createdAt: '2018-06-30'}, 
	{key: '5',	planCode: 'PV180726005',	plant: '上海',	product: '蟹味菇',	planDate: '2018-07-28',	planVolume: '100',	unit: 'KG',	createdBy: 'Admin',	createdAt: '2018-06-30'}, 
	{key: '6',	planCode: 'PV180726006',	plant: '上海',	product: '白玉菇',	planDate: '2018-07-28',	planVolume: '100',	unit: 'KG',	createdBy: 'Admin',	createdAt: '2018-06-30'}
];

const sortString = (s1, s2) => {
	if(s1 === s2) {
		return 0;
	} else {
		return s1 < s2 ? -1 : 1;
	}
};

const columns = [
	{key: 'planCode',	title: '预估编码',	dataIndex: 'planCode', sorter: (a, b) => sortString(a.planCode, b.planCode)}, 
	{key: 'plant',	title: '工厂',	dataIndex: 'plant', sorter: (a, b) => sortString(a.plant, b.plant)}, 
	{key: 'product',	title: '货物',	dataIndex: 'product', sorter: (a, b) => sortString(a.product, b.product)}, 
	{key: 'planDate',	title: '预估日期',	dataIndex: 'planDate', sorter: (a, b) => sortString(a.planDate, b.planDate)}, 
	{key: 'planVolume',	title: '产量',	dataIndex: 'planVolume'}, 
	{key: 'unit',	title: '单位',	dataIndex: 'unit'}, 
	{key: 'createdBy',	title: '创建者',	dataIndex: 'createdBy'}, 
	{key: 'createdAt',	title: '创建日期',	dataIndex: 'createdAt'}
];

class ProductionPlan extends Component {

	state = {
		loading: false,
		visible: false
	};

	/*----------------------------filter----------------------------*/
	handleDateChange = (date, dateString) => {
		console.log(date, dateString);
	};

	handleProductChange = (value) => {
		console.log(value);
	};

	handleSearch = (e) => {
		// e.preventDefault();
		// this.props.form.validateFields((err, values) => {
		// 	console.log('Received values of form: ', values);
		// });
	};

	handldeReset = (e) => {
		// this.props.form.resetFields();
	};
	
	/*----------------------------toolbar----------------------------*/
	handleCreate = () => {
		this.setState({
			visible: true
		});
	};
	
	/*----------------------------modal----------------------------*/
	handleSubmit = (e) => {
		this.setState({ loading: true });
	    setTimeout(() => {
	      this.setState({ loading: false, visible: false });
	    }, 3000);
	};

	handleCancel = (e) => {
		this.setState({
			visible: false
		});
	};

  render() {
  	const { visible, loading } = this.state;
    return(
      <Content className="mainContent">
      	{/*----------------------------filter----------------------------*/}
      	<Collapse defaultActiveKey="filter" bordered={true}>
      		<Panel key="filter" header="筛选条件">
				<Form
		      		layout="inline"
					onSubmit={this.handleSearch}
		      	>
		      		<FormItem label="起止时间：">
		      			<RangePicker onChange={this.handleDateChange}></RangePicker>
		      		</FormItem>
		      		<FormItem label="货物：">
		      			<Select
						    showSearch
						    style={{ width: 200 }}
						    placeholder="选择货物"
						    optionFilterProp="children"
						    onChange={this.handleProductChange}
						    onFocus={this.handleProductChange}
						    onBlur={this.handleProductChange}
						    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
						    <Option value="crab">蟹味菇</Option>
						    <Option value="white">白玉菇</Option>
						  </Select>
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
      	<Modal
			title="创建预估产量"
			visible={visible}
			width="80%"
			onOk={this.handleSubmit}
			onCancel={this.handleCancel}
			footer={[
				<Button key="submit" type="primary" onClick={this.handleSubmit} loading={loading}>保存</Button>,
				<Button key="cancel" onClick={this.handleCancel}>取消</Button>
			]}
		>
    	</Modal>
      	{/*----------------------------table----------------------------*/}
      	<Table dataSource={dataSource} columns={columns} />
      </Content>
    );
  }
}

export default ProductionPlan;