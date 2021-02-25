import React, { Component } from 'react';
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Button,
  Icon,
  Row,
  Col,
  Drawer
} from 'antd';

import request from '../../../../utils/request';
const { Search } = Input;

const EditableContext = React.createContext(undefined, undefined);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `请输入 ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

export default
@Form.create()
class UserTablePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editingKey: '',
      visible: false,
      selectedRowKeys: []
    };
    this.columns = [
      {
        title: () => {
          return (
            <span>
              <Icon type="smile" />
              操作
            </span>
          );
        },
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          if (editable) {
            return (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      onClick={() => this.save(form, record.key)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                    </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确定?"
                  onConfirm={() => this.cancel(record.key)}
                >
                  <a>返回</a>
                </Popconfirm>
              </span>
            );
          }
          if (!editable || this.state.data.length >= 1) {
            return (
              <span>
                <Button shape="circle" onClick={() => this.edit(record.key)}>
                  <Icon type="edit" />
                </Button>
                <Button
                  shape="circle"
                  onClick={() => this.handleDelete(record.key)}
                >
                  <Icon type="delete" />
                </Button>
              </span>
            );
          }
        }
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '25%',
        editable: true,
        filters: [
          {
            text: '张三',
            value: 'Joe'
          },
          {
            text: '李四',
            value: 'Jim'
          }
        ]
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: '15%',
        editable: true,
        defaultSortOrder: 'ascend',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: '40%',
        editable: true
      }
    ];
  }

  componentDidMount() {
    request.get('/user').then(res => {
      let userInfo = res.res;
      const data = [];
      for (let i = 0; i < userInfo.length; i++) {
        data.push({
          key: userInfo[i].id,
          name: userInfo[i].username,
          age: userInfo[i].age,
          address: userInfo[i].address
        });
      }
      this.setState({ data });
    });
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '', visible: false });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }
  //删除
  handleDelete(key) {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
  }
  //全部删除
  handleDeleteAll = () => {
    const selectedRowKeys = this.state.selectedRowKeys; //选中的id
    console.log(selectedRowKeys);
    //const data = [...this.state.data];
    this.setState({ data: [] });
  };
  //查询按钮事件回调
  handleSearch = value => {
    for (let i = 0; i < this.state.data.length; i++) {
      if (value === this.state.data[i].name) {
        const data = [...this.state.data];
        this.setState({ data: data.filter(item => item.name === value) });
      }
    }
  };
  //展示增加用户的抽屉
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  //点击返回和关闭新增窗口回调
  addPageCancel = () => {
    this.setState({
      visible: false
    });
  };
  //增加用户
  addUser = () => {
    const { data } = this.state;
    const newData = {
      key: this.state.data.length + 1,
      name: this.props.form.getFieldValue('name'),
      age: this.props.form.getFieldValue('age'),
      address: this.props.form.getFieldValue('address')
    };
    this.setState({
      data: [...data, newData],
      visible: false
    });
  };
  //刷新页面
  handleReloadTable = () => {
    this.setState({
      data: this.state.data
    });
  };
  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });
    //选择框行为
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows
        );
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        });
      }
    };

    //拿到抽屉表格
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <EditableContext.Provider value={this.props.form}>
          <div>
            <div style={{ marginTop: '6px' }}>
              <Button
                type="primary"
                onClick={this.handleDeleteAll}
                style={{ marginLeft: '10px' }}
              >
                全部删除
              </Button>
              <Button
                type="primary"
                onClick={this.showDrawer}
                style={{ marginLeft: '20px' }}
              >
                增加
              </Button>
              <Search
                placeholder="搜索"
                onSearch={this.handleSearch}
                style={{ width: 200, marginLeft: '60%' }}
                enterButton
              />
              <Button
                type="primary"
                style={{ marginLeft: '5px' }}
                onClick={this.handleReloadTable}
              >
                <Icon type="reload" />
              </Button>
            </div>
            <Drawer
              title="增加用户"
              width={400}
              onClose={this.addPageCancel}
              visible={this.state.visible}
              placement={'right'}
            >
              <Form layout="vertical" onSubmit={this.addUser}>
                <Row gutter={12}>
                  <Col span={16}>
                    <Form.Item label="姓名">
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名' }]
                      })(
                        <Input placeholder="姓名" name="name" size={'large'} />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={16}>
                    <Form.Item label="年龄">
                      {getFieldDecorator('age', {
                        rules: [{ required: true, message: '请输入年龄' }]
                      })(
                        <InputNumber
                          min={1}
                          placeholder="年龄"
                          size={'large'}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={12}>
                  <Col span={16}>
                    <Form.Item label="地址">
                      {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入地址' }]
                      })(<Input placeholder="地址" size={'large'} />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  borderTop: '1px solid #e9e9e9',
                  padding: '10px 16px',
                  background: 'black',
                  textAlign: 'center'
                }}
              >
                <Button onClick={this.addPageCancel} style={{ marginRight: 8 }}>
                  返回
                </Button>
                <Button onClick={this.addUser} type="primary">
                  增加
                </Button>
              </div>
            </Drawer>
          </div>
          <Table
            rowSelection={rowSelection}
            components={components}
            bordered
            dataSource={this.state.data}
            columns={columns}
            rowClassName="editable-row"
            scroll={{ y: 500 }}
            pagination={{
              total: this.state.data.length,
              onChange: this.cancel,
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `显示第${range[0]}至${range[1]}项结果， 共 ${total} 项`
            }}
          />
        </EditableContext.Provider>
      </div>
    );
  }
}
