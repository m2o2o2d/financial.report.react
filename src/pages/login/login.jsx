import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import logo from '@/assets/images/logo.svg';
import './login.less';

const FormItem = Form.Item;

class Login extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log("values:", values);
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div id="login">
				<div className="logo">
					<img alt="GrapeCity" src={logo} />
    				<span>财务报表系统</span>
    			</div>
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
						<Button type="primary" className="login-form-button" href="/#/app/home">登录</Button>
						没有用户？<a href="/register">注册！</a>
					</FormItem>
				</Form>
			</div>
		);
	};
}

export default Form.create()(Login);