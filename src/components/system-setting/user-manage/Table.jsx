import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { Confirm } from '@components/common'
import { userManageService } from '@services'

class UserTable extends React.PureComponent {
  static propTypes = {
    users: PropTypes.array,
    pagination: PropTypes.shape({
      current: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number
    }),
    openUserModal: PropTypes.func.isRequired,
    openUpdatePasswordModal: PropTypes.func.isRequired,
    openPermissionModal: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    loading: PropTypes.bool
  }
  constructor (props) {
    super(props)

    this.deleteUser = this.deleteUser.bind(this)
    this.updateUserStatus = this.updateUserStatus.bind(this)
  }
  deleteUser (id) {
    userManageService.deleteUser(id).then(() => {
      this.props.fetchUsers()
    })
  }
  // 启用或者禁用状态
  updateUserStatus (id, status) {
    userManageService.updateUserStatus(id, status).then(() => {
      this.props.fetchUsers()
    })
  }
  render () {
    const { users, pagination, openUserModal, openUpdatePasswordModal, openPermissionModal, loading } = this.props
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
          return <span>{text ? '启用' : '禁用'}</span>
        },
        align: 'center',
      },
      {
        title: '操作',
        render: (text, record, index) => {
          return (
            <div>
              <Button
                type="primary"
                className="margin-right-xs"
                onClick={() => this.updateUserStatus(record.id, record.status === 1 ? 0 : 1)}>
                { record.status ? '禁用' : '启用' }
              </Button>
              <Button
                type="primary"
                className="margin-right-xs"
                onClick={() => {openUserModal('update', index)}}>
                编辑
              </Button>
              <Button
                type="primary"
                className="margin-right-xs"
                onClick={() => {openPermissionModal(index)}}>
                权限
              </Button>
              <Button
                type="primary"
                className="margin-right-xs"
                onClick={() => {openUpdatePasswordModal(index)}}>
                重置密码
              </Button>
              <Confirm options={{onOk: () => this.deleteUser(record.id)}}>
                <Button type="danger" className="margin-right-xs">删除</Button>
              </Confirm>
            </div>
          )
        },
        dataIndex: 'operation',
        align: 'center'
      }
    ]
    
    return (
      <Table
        size='middle'
        loading={loading}
        columns={columns}
        dataSource={users}
        pagination={pagination}
        rowKey='id'>
      </Table>
    )
  }
}

UserTable.defaultProps = {
  loading: false
}

export default UserTable