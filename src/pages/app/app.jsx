import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import PublicHeader from '@/components/header/header';
import PublicSider from '@/components/sider/sider';
import asyncComponent from '@/utils/asyncComponent';
import './app.less';

const home = asyncComponent(() => import("@/pages/home/home"));
const productionPlan = asyncComponent(() => import("@/pages/productionPlan/productionPlan"));

class App extends Component {

	render() {
		return (
			<Layout>
				<PublicHeader />
				<Layout>
					<PublicSider>PublicSider</PublicSider>
					<HashRouter>
						<Switch>
							<Route path="/" exact component={productionPlan} />
						</Switch>
					</HashRouter>
				</Layout>
			</Layout>
		);
	};
}

export default App;