import React, { Component } from 'react';
// eslint-disable-next-line no-unused-vars
import { Input, Icon, Button } from 'antd';
import styles from './HeaderPage.less';

const { Search } = Input;
export default class HeaderPage extends Component {
  render() {
    return (
      <div className={styles.headerHeight}>
        <Search
          placeholder="搜索"
          onSearch={value => alert(value)}
          style={{ width: 200 }}
        />
        <div className={styles.reload}>
          <Button type="primary">
            <Icon type="reload" />
          </Button>
        </div>
      </div>
    );
  }
}
