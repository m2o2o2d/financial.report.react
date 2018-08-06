import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
// import { is, fromJS } from 'immutable';
import { login, clearError } from '@/store/login/action';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import logo from '@/assets/images/logo.svg';
import './login.less';

const FormItem = Form.Item;

class Login extends Component {

	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		user: PropTypes.object,
		error: PropTypes.string,
		login: PropTypes.func.isRequired,
		clearError: PropTypes.func.isRequired
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				const userName = values.userName;
				const password = values.password;
				this.props.login(userName, password);
			}
		});
	};

	handleMsgClose = () => {
		this.props.clearError();
	};

	render() {
		const { isAuthenticated, error } = this.props;
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
				{ isAuthenticated ? <Redirect to="/app"/> : null }
				<div className="logo">
					<img alt="GrapeCity" src={logo} />
    				<span>财务报表系统</span>
    			</div>
    			{ error && error.length > 0 ? <Alert className="alert" message={error} type="error" closable afterClose={this.handleMsgClose}/> : null }
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('userName', {
			            	rules: [{ required: true, message: '请输入用户名' }],
			          	})(
			            	<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" size="large" />
			          	)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
			            	rules: [{ required: true, message: '请输入密码' }],
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" size="large" />
			          	)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住我</Checkbox>
						)}
						<a className="login-form-forgot" href="">忘记密码？</a>
						<Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
						没有用户？<a href="/register">注册！</a>
					</FormItem>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	user: state.default && state.default.user || null,
	isAuthenticated: state.default && state.default.isAuthenticated || false,
	error: state.default && state.default.error || null
});

const mapDispatchToProps = {
	login,
	clearError
};

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login)));
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));