import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

class AuthorizedRoute extends Component {
	
	render() {
		const { component: Component, path: path, ...rest } = this.props;
		const isAuthorized = sessionStorage.getItem("userName") != null ? true:false;
		// Todo: store origin url
		return(
			<Route {...rest} render={ props => (
				isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
			)} />
		);
	};

}

// export default AuthorizedRoute;