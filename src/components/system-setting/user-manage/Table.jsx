import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'

class UserTable extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array,
    pagination: PropTypes.shape({
      current: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number
    })
  }
  render () {
    const { users, pagination } = this.props
    const columns = [
      {
        title: '姓名',
        dataIndex : 'name',
        align: 'center'
      },
      {
        title: '电话',
        dataIndex : 'phone',
        align: 'center'
      },
      {
        title: '登录账号',
        dataIndex : 'loginName',
        align: 'center'
      },
      {
        title: '部门',
        dataIndex : 'dept.name',
        align: 'center'
      },
      {
        title: '角色',
        dataIndex : 'role.name',
        align: 'center'
      },
      {
        title: '状态',
        dataIndex : 'status',
        render: (text) => {
          return <span>{text === 1 ? '启用' : '禁用'}</span>
        },
        align: 'center',
      },
      {
        title: '操作',
        render: () => {
          return (
            <div>
              <Button
                type="primary"
                className="margin-right-xs">
                停用
              </Button>
              <Button
                type="primary"
                className="margin-right-xs">
                编辑
              </Button>
              <Button
                type="primary"
                className="margin-right-xs">
                权限
              </Button>
              <Button
                type="primary"
                className="margin-right-xs">
                重置密码
              </Button>
              <Button
                type="danger"
                className="margin-right-xs">
                删除
              </Button>
            </div>
          )
        },
        dataIndex: 'operation',
        align: 'center'
      }
    ]
    
    return (
      <Table
        columns={columns}
        dataSource={users}
        pagination={pagination}
        rowKey='id'>
      </Table>
    )
  }
}

export default UserTable