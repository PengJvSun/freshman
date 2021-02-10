import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
// eslint-disable-next-line no-unused-vars
import { Menu, Icon, Layout } from 'antd';
import { routerRedux } from 'dva/router';

// eslint-disable-next-line no-unused-vars
const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    let { children, changePath } = this.props;
    return (
      <Layout className="layout">
        {/*<Header>*/}
        {/*  <Menu onClick={changePath} theme="dark" mode="horizontal">*/}
        {/*    <Menu.Item key="/home">*/}
        {/*      <Icon type="home" />*/}
        {/*      Home Page*/}
        {/*    </Menu.Item>*/}
        {/*    <Menu.Item key="/user">*/}
        {/*      <Icon type="user" />*/}
        {/*      UserMgmt*/}
        {/*    </Menu.Item>*/}
        {/*  </Menu>*/}
        {/*</Header>*/}
        {/*<Content style={{ padding: '0 50px' }}>*/}
        {/*  <div style={{ background: '#fff', padding: 24, minHeight: 800 }}>*/}
        {/*    {children}*/}
        {/*  </div>*/}
        {/*</Content>*/}
        {/*<Footer style={{ textAlign: 'left' }}>©Eccom</Footer>*/}
        {children}
      </Layout>
    );
  }
}

App.propTypes = {
  loginUser: PropTypes.object
};

function mapStateToProps(state) {
  return {
    loginUser: state.app.loginUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePath: ({ key }) => {
      dispatch(
        routerRedux.push({
          pathname: key
        })
      );
    }
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
