import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import PublicHeader from '@/components/header/header';
import PublicSider from '@/components/sider/sider';
import asyncComponent from '@/utils/asyncComponent';
import './app.less';

import home from '@/pages/home/home';
import productionPlan from '@/pages/productionPlan/productionPlan';
import rebate from '@/pages/rebate/rebate';

// const home = asyncComponent(() => import("@/pages/home/home"));
// const productionPlan = asyncComponent(() => import("@/pages/productionPlan/productionPlan"));
// const rebate = asyncComponent(() => import("@/pages/rebate/rebate"));

class App extends Component {

	render() {
		return (
			<Layout>
				<PublicHeader />
				<Layout>
					<PublicSider>PublicSider</PublicSider>
					<Switch>
						<Route path="/app/home" component={home} />
						<Route path="/app/productionPlan" component={productionPlan} />
						<Route path="/app/rebate" component={rebate} />
					</Switch>
				</Layout>
			</Layout>
		);
	};
}

export default App;