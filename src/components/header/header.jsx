import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Avatar, Row, Col, Popover, Button } from 'antd';
import logo from '@/assets/images/logo.svg';
import './header.less';

const { Header } = Layout;

class PublicHeader extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

    state = {
        isPopoverVisible: false
    };

    handlePopoverVisibleChange = (visible) => {
        this.setState({isPopoverVisible: visible});
    };

    handleLogout = (e) => {
        this.setState({isPopoverVisible: false});
        this.props.logout();
    };

    render() {
        const { user } = this.props;
        const content = (
            <a onClick={this.handleLogout}>退出</a>
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
                            <Popover 
                                placement="bottomRight" 
                                title={'当前登录：'+user.UserID} 
                                content={content}
                                visible={this.state.isPopoverVisible}
                                trigger="click"
                                onVisibleChange={this.handlePopoverVisibleChange}>
                                <div id="avatar">
                                    <Avatar icon="user" />
                                </div>
                            </Popover>
              			</Col>
              		</Row>
              	</div>
            </Header>
        );
    }
}

export default PublicHeader;