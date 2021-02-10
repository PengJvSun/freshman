import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
export default class NavLeftPage extends Component {
  state = {
    collapsed: false
  };

  render() {
    let { changePath } = this.props;
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        onClick={changePath}
        style={{ maxHeight: '100%' }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              <span>Stydy Demo</span>
            </span>
          }
        >
          <Menu.Item key="1">
            <span>111</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>222</span>
          </Menu.Item>
          <Menu.Item key="3">
            <span>333</span>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
