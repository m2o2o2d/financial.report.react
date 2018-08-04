import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { logout } from '@/store/login/action';
import { Layout } from 'antd';
import PublicHeader from '@/components/header/header';
import PublicSider from '@/components/sider/sider';
// import asyncComponent from '@/utils/asyncComponent';
import './app.less';

import home from '@/pages/home/home';
import productionPlan from '@/pages/productionPlan/productionPlan';
import rebateMonth from '@/pages/rebate/rebateMonth';
import rebateYear from '@/pages/rebate/rebateYear';
import rebateCustomer from '@/pages/rebate/rebateCustomer';
// const home = asyncComponent(() => import("@/pages/home/home"));
// const productionPlan = asyncComponent(() => import("@/pages/productionPlan/productionPlan"));
// const rebateMonth = asyncComponent(() => import("@/pages/rebate/rebateMonth"));
// const rebateYear = asyncComponent(() => import("@/pages/rebate/rebateYear"));
// const rebateCustomer = asyncComponent(() => import("@/pages/rebate/rebateCustomer"));

class App extends Component {

	static propTypes = {
		user: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
		logout: PropTypes.func.isRequired
	};

	render() {
		const { user, isAuthenticated, logout } = this.props;
		return (
			<Layout>
				{ isAuthenticated ? null : <Redirect to="/login"/> }
				<PublicHeader user={user} logout={logout}/>
				<Layout>
					<PublicSider />
					<Switch>
						<Route path="/app" exact component={home} />
						<Route path="/app/rebateMonth" component={rebateMonth} />
						<Route path="/app/rebateYear" component={rebateYear} />
						<Route path="/app/rebateCustomer" component={rebateCustomer} />
						<Route path="/app/productionPlan" component={productionPlan} />
					</Switch>
				</Layout>
			</Layout>
		);
	};
}

const mapStateToProps = (state, ownProps) => ({
	user: state.loginData.user || {UserID: '10001', UserName: 'm2o2o2d'},
	isAuthenticated: state.loginData.isAuthenticated || false
});

const mapDispatchToProps = {
	logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);