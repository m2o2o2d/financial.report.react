import React, { Component } from 'react';
import { Layout, Avatar, Row, Col } from 'antd';
import logo from '@/assets/images/logo.svg';
import './header.less';

const { Header } = Layout;

class PublicHeader extends Component {
    render() {
        return(
            <Header style={{background: '#000'}}>
              	<div>
              		<Row>
              			<Col span={12}>
              				<a id="logo" href="">
        						<img alt="GrapeCity" src={logo} />
        						<span>财务报表系统</span>
        					</a>
              			</Col>	
              			<Col>
              				<a id="avatar" href="">
              					<Avatar icon="user" />
              				</a>
              			</Col>
              		</Row>
              	</div>
            </Header>
        );
    }
}

export default PublicHeader;