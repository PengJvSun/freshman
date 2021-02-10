import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Form, Icon, Input, Button, message } from 'antd';
import styles from './LoginPage.less';

const Item = Form.Item;
export default
@Form.create()
@connect()
class LoginPage extends Component {
  handleSubmit = e => {
    //阻止表单的提交
    e.preventDefault();
    const { dispatch } = this.props;
    //对表单所有的数据进行统一验证
    this.props.form.validateFields((err, values) => {
      const username = '1111';
      const password = '1111';
      if (
        `${values.username}` !== username ||
        `${values.password}` !== password
      ) {
        message.error('登录失败');
      } else {
        dispatch(routerRedux.push('/admin'));
      }
    });
  };

  /*自定义密码校验回调函数*/
  validatorHandelPwd = (rule, value, coolback) => {
    // 必须输入密码
    // 密码必须大于4
    // 密码最长12位
    // 4到16位（字母，数字，下划线，减号）
    value = value.trim();
    if (!value) {
      coolback('密码不能为空');
    } else if (value.length < 4) {
      coolback('密码必须大于4');
    } else if (value.length >= 12) {
      coolback('密码最长12位');
    } else if (!/^[a-zA-Z0-9_-]{4,16}$/.test(value)) {
      coolback('4到16位（字母，数字，下划线，减号）');
    } else {
      coolback(); //验证通过
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.login}>
        <div className={styles.login_form}>
          <Form>
            <Item>
              <div className={styles.formHeader}>欢迎登录</div>
            </Item>
            <Item>
              {getFieldDecorator('username', {
                initialValue: '', //指定初始值
                rules: [
                  { required: true, message: '必须输入用户名' },
                  { min: 4, message: '用户名必须大于4位' },
                  { max: 12, message: '用户名最长12位' },
                  {
                    pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                    message: '4到16位（字母，数字，下划线，减号）'
                  },
                  { whitespace: true }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                initialValue: '', //指定初始值
                rules: [{ validator: this.validatorHandelPwd }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>

            <Item>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                shape="round"
                htmlType="submit"
                style={{
                  width: '100%',
                  backgroundColor: 'darkblue',
                  borderColor: 'darkblue'
                }}
              >
                登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    );
  }
}
