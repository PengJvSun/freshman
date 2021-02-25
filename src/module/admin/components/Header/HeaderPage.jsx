import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Input } from 'antd';
import styles from './HeaderPage.less';
import request from '../../../../utils/request';
const data = [];
const result = request.get('/user');
result.then(res => {
  let userInfo = res.res;
  for (let i = 0; i < userInfo.length; i++) {
    data.push({
      key: userInfo[i].id,
      name: userInfo[i].username,
      age: userInfo[i].age,
      address: userInfo[i].address
    });
  }
});
const { Search } = Input;
export default class HeaderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }
  handleSerach = () => {
    //console.log(this.state.data);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].name, data[i].age, data[i].address);
    }
  };
  render() {
    return (
      <div className={styles.headerHeight}>
        <Search
          placeholder="搜索"
          onSearch={this.handleSerach}
          style={{ width: 200 }}
        />
        {/*<div className={styles.reload}>*/}
        {/*  <Button type="primary">*/}
        {/*    <Icon type="reload" />*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
    );
  }
}
