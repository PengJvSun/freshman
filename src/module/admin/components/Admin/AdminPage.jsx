import React, { Component } from 'react';
import { Layout } from 'antd';
import NavLeftPage from '../NavLeft/NavLeftPage';
// eslint-disable-next-line no-unused-vars
import UserTablePage from '../UserTable/UserTablePage';
// eslint-disable-next-line no-unused-vars
const { Header, Sider, Content } = Layout;
export default class AdminPage extends Component {
  render() {
    return (
      <Layout>
        <Sider theme="dark">
          <NavLeftPage />
        </Sider>
        <Layout>
          {/*<Header*/}
          {/*  style={{*/}
          {/*    backgroundColor: 'white'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <HeaderPage />*/}
          {/*</Header>*/}
          <Content
            style={{
              backgroundColor: '#fff',
              minHeight: '700px'
            }}
          >
            <div>
              <UserTablePage />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
