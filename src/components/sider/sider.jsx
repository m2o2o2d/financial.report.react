import React, { Component } from 'react';
import {  Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import './sider.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

class PublicSider extends Component {

    state = {
        collapsed: false
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    render() {
        return(
            <Sider width={200} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['home']}
                    defaultOpenKeys={['home']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="home">
                        <Link to="/app/home"><Icon type="home" />主页</Link>
                    </Menu.Item>
                    <SubMenu key="rebate" title={<span><Icon type="folder-open" /><span>返利管理</span></span>}>
                        <Menu.Item key="rebateMonth">
                            <Link to="/app/rebateMonth">月度返利规则设定</Link>
                        </Menu.Item>
                        <Menu.Item key="rebateYear">
                            <Link to="/app/rebateYear">年度返利规则设定</Link>
                        </Menu.Item>
                        <Menu.Item key="rebateCustomer">
                            <Link to="/app/rebateCustomer">客户返利设定</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="productionPlan">
                        <Link to="/app/productionPlan"><Icon type="folder-open" />产量预估管理</Link>
                    </Menu.Item>
                    <SubMenu key="sub4" title={<span><Icon type="folder-open" /><span>仓库管理</span></span>}>
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><Icon type="folder-open" /><span>库存管理</span></span>}>
                        <Menu.Item key="13">option9</Menu.Item>
                        <Menu.Item key="14">option10</Menu.Item>
                        <Menu.Item key="15">option11</Menu.Item>
                        <Menu.Item key="16">option12</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub6" title={<span><Icon type="folder-open" /><span>财务管理</span></span>}>
                        <Menu.Item key="17">option9</Menu.Item>
                        <Menu.Item key="18">option10</Menu.Item>
                        <Menu.Item key="19">option11</Menu.Item>
                        <Menu.Item key="20">option12</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default PublicSider;