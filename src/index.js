import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import store from '@/store/store';
import asyncComponent from '@/utils/asyncComponent';

FastClick.attach(document.body);

const home = asyncComponent(() => import("@/pages/home/home"));
const login = asyncComponent(() => import("@/pages/login/login"));
const register = asyncComponent(() => import("@/pages/login/register"));

const render = Component => {
	ReactDOM.render(
		// Bind to redux, hot loader
		<Provider store={store}>
			<AppContainer>
				<HashRouter>
					<Switch>
						<Route path="/" exact component={home} />
						<Route path="/login" component={login} />
						<Route path="/register" component={register} />
						<Redirect to="/" />
					</Switch>
				</HashRouter>
			</AppContainer>
		</Provider>,
		document.getElementById('root')
	);
};

render();

// Webpack Hot Module Replacement(HMR) API
if(module.hot) {
	module.hot.accept();
}

registerServiceWorker();
