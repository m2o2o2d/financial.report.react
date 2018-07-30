import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import logo from '@/assets/images/logo.svg';
import './login.less';

const FormItem = Form.Item;

class Login extends Component {

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
				<img alt="GrapeCity" src={logo} />
    			<span>财务报表系统</span>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('userName', {
			            	rules: [{ required: true, message: '请输入用户名' }],
			          	})(
			            	<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
			          	)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
			            	rules: [{ required: true, message: '请输入密码' }],
			          	})(
			            	<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
			          	)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>记住我</Checkbox>
						)}
					</FormItem>
					<a className="login-form-forgot" href="">忘记密码？</a>
					<Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
					没有用户？<a href="">注册！</a>
				</Form>
			</div>
		);
	};
}

export default Login;