import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Avatar, Row, Col, Menu, Dropdown, Button } from 'antd';
import logo from '@/assets/images/logo.svg';
import './header.less';

const { Header } = Layout;

class PublicHeader extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    state = {
        isVisible: false
    };

    handleVisibleChange = (visible) => {
        this.setState({isVisible: visible});
    };

    handleMenuClick = ({key}) => {
        this.setState({isVisible: false});
        switch(key) {
            case "logout": this.props.logout(); break;
            default:;
        }
    };

    render() {
        const { user } = this.props;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="current">
                    当前登录：{user.UserID}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <a onClick={this.handleLogout}>退出</a>
                </Menu.Item>
            </Menu>
        );
        return(
            <Header style={{background: '#000'}}>
              	<div>
              		<Row>
              			<Col span={12}>
              				<div id="logo">
        						<img alt="GrapeCity" src={logo} />
        						<span>财务报表系统</span>
        					</div>
              			</Col>	
              			<Col>
                            <Dropdown 
                                overlay={menu}
                                trigger={['click']}
                                visible={this.state.isVisible}
                                onVisibleChange={this.handleVisibleChange}>
                                <div id="avatar">
                                    <Avatar icon="user" />
                                </div>
                            </Dropdown>
              			</Col>
              		</Row>
              	</div>
            </Header>
        );
    }
}

export default PublicHeader;