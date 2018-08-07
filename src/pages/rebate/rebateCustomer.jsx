import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initData as initMonthData } from '@/store/rebate/month/action';
import { initData as initYearData } from '@/store/rebate/year/action';
import { initData as initCustomerData } from '@/store/rebate/customer/action';
import { Button, Collapse, Form, Input, InputNumber, Layout, Modal, Table } from 'antd';
import './rebateCustomer.less';

const { Content } = Layout;
const Panel = Collapse.Panel;
const FormItem = Form.Item;

class RebateCustomer extends Component {

	static propTypes = {
		monthItems: PropTypes.array.isRequired,
		monthColumns: PropTypes.array.isRequired,
		yearItems: PropTypes.array.isRequired,
		yearColumns: PropTypes.array.isRequired,
		customerItems: PropTypes.array.isRequired,
		customerColumns: PropTypes.array.isRequired,
	};

	tableProperty = {
		size: 'small',
		pagination: false,
		scroll: { y: 220 }
	};

	rebMonthRowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
    		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  		},
		getCheckboxProps: record => ({
		    disabled: record.name === 'Disabled User',
		    name: record.name,
		})
	};

	rebYearRowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
    		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  		},
		getCheckboxProps: record => ({
		    disabled: record.name === 'Disabled User',
		    name: record.name,
		})
	};

	rebCustomerRowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
    		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  		},
		getCheckboxProps: record => ({
		    disabled: record.name === 'Disabled User',
		    name: record.name,
		})
	};

	componentDidMount() {
		this.props.initMonthData();
		this.props.initYearData();
		this.props.initCustomerData();
	}

	render() {
		const { monthItems, monthColumns, yearItems, yearColumns, customerItems, customerColumns } = this.props;
		const tableProperty = this.tableProperty;
		return (
			<Content className="mainContent" id="rebateCustomer">
		      	<Table {...tableProperty} className="rebCus_table" rowKey="rebMonthRuleCode" rowSelection={this.rebMonthRowSelection} dataSource={monthItems} columns={monthColumns} />
		      	<Table {...tableProperty} rowKey="rebYearRuleCode" rowSelection={this.rebYearRowSelection} dataSource={yearItems} columns={yearColumns} />
				<div className="toolbar">
					<Button type="default">重置</Button>
		      		<Button type="primary">更新</Button>
		      	</div>
		      	<Table {...tableProperty} rowKey="customerCode" rowSelection={this.rebCustomerRowSelection} dataSource={customerItems} columns={customerColumns} />
			</Content>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	monthItems: state.rebateMonth && state.rebateMonth.items || null,
	monthColumns: state.rebateMonth && state.rebateMonth.columns || null,
	yearItems: state.rebateYear && state.rebateYear.items || null,
	yearColumns: state.rebateYear && state.rebateYear.columns || null,
	customerItems: state.rebateCustomer && state.rebateCustomer.items || null,
	customerColumns: state.rebateCustomer && state.rebateCustomer.columns || null
});

const mapDispatchToProps = {
	initMonthData,
	initYearData,
	initCustomerData
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(RebateCustomer));