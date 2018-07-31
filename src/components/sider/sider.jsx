import React, { Component } from 'react';
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
          defaultSelectedKeys={['sub1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="sub1"><Icon type="home" /><span>主页</span></Menu.Item>
          <SubMenu key="sub2" title={<span><Icon type="folder-open" /><span>采购管理</span></span>}>
            <Menu.Item key="1">采购单列表</Menu.Item>
            <Menu.Item key="2">供应商采购量图</Menu.Item>
            <Menu.Item key="3">货物采购量图</Menu.Item>
            <Menu.Item key="4">采购对比图</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="folder-open" /><span>销售管理</span></span>}>
            <Menu.Item key="5">option9</Menu.Item>
            <Menu.Item key="6">option10</Menu.Item>
            <Menu.Item key="7">option11</Menu.Item>
            <Menu.Item key="8">option12</Menu.Item>
          </SubMenu>
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