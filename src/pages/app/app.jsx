import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import PublicHeader from '@/components/header/header';
import PublicSider from '@/components/sider/sider';
// import AuthorizedRoute from '@/components/authorizedRoute/authorizedRoute';
import asyncComponent from '@/utils/asyncComponent';
import './app.less';

const home = asyncComponent(() => import("@/pages/home/home"));
const productionPlan = asyncComponent(() => import("@/pages/productionPlan/productionPlan"));
const rebateMonth = asyncComponent(() => import("@/pages/rebate/rebateMonth"));
const rebateYear = asyncComponent(() => import("@/pages/rebate/rebateYear"));
const rebateCustomer = asyncComponent(() => import("@/pages/rebate/rebateCustomer"));

class App extends Component {

	render() {
		return (
			<Layout>
				<PublicHeader />
				<Layout>
					<PublicSider>PublicSider</PublicSider>
					<Switch>
						<Route path="/app" component={home} />
						<Route path="/app/productionPlan" component={productionPlan} />
						<Route path="/app/rebateMonth" component={rebateMonth} />
						<Route path="/app/rebateYear" component={rebateYear} />
						<Route path="/app/rebateCustomer" component={rebateCustomer} />
					</Switch>
				</Layout>
			</Layout>
		);
	};
}

export default App;