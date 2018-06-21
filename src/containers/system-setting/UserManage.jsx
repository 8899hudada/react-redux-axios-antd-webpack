import React from 'react'
import { Card, Button } from 'antd'
import { Search, Table, UserModal, UpdatePasswordModal, PermissionModal } from '@components/system-setting/user-manage'
import { PageHeader } from '@components/common'
import { departmentManageService, userManageService, roleManageService } from '@services'
import config from '@config'

class UserManage extends React.PureComponent {
  constructor (props) {
    super(props)
    
    this.fetchDepartments = this.fetchDepartments.bind(this)
    this.fetchRoles = this.fetchRoles.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
    this.updatePagination = this.updatePagination.bind(this)
    this.updateSearchParams = this.updateSearchParams.bind(this)
    this.toggleUserModal = this.toggleUserModal.bind(this)

    this.state = {
      searchParams: {
        name: '', // 姓名
        phone: '', // 电话
        deptId: -1, // 部门id
        roleId: -1 // 角色id
      },
      departments: [], // 部门列表
      roles: [], // 角色列表
      users: [], // 角色列表
      pagination: { // 分页
        ...config.pagination,
        onChange: current => this.updatePagination({current}),
        onShowSizeChange: (current, pageSize) => this.updatePagination({pageSize})  
      },
      userModalVisible: false, // 显示人员弹窗
      userModalType: 'update', // 人员弹窗类型 [create：新增，update：编辑]
      editUserIndex: 0, // 编辑的人员索引
      updatePasswordModalVisible: false, // 显示更新密码弹窗
      permissionModalVisible: false // 显示分配权限弹窗
    }
  }
  fetchDepartments () {
    departmentManageService.fetchDepartments({
      current: 1,
      pageSize: 300
    }).then(res => {
      this.setState({
        departments: res.data.pageData
      })
    })
  }
  fetchRoles () {
    roleManageService.fetchRoles({
      current: 1,
      pageSize: 300
    }).then(res => {
      this.setState({
        roles: res.data.pageData
      })
    })
  }
  fetchUsers () {
    const { searchParams, pagination } = this.state
    const { current, pageSize } = pagination
    
    userManageService.fetchUsers({
      current,
      pageSize,
      ...searchParams
    }).then(res => {
      this.setState({
        users: res.data.pageData || [],
        pagination: {
          ...this.state.pagination,
          total: res.data.total || 0
        }
      })
    })
  }
  updatePagination (pagination = {}) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        ...pagination
      }
    }, this.fetchUsers) 
  }
  updateSearchParams (searchParams = {}) {
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        ...searchParams
      }
    }) 
  }
  toggleUserModal (visible = false, type = 'create', editUserIndex = 0) {
    const state = {
      userModalVisible: visible,
      userModalType: type,
    }
    
    if (type === 'update') {
      state.editUserIndex = editUserIndex
    }

    this.setState(state)
  }
  toggleUpdatePasswordModal (visible = false, editUserIndex = 0) {
    const state = {updatePasswordModalVisible: visible}

    if (visible) {
      state.editUserIndex = editUserIndex
    }

    this.setState(state)
  }
  togglePermissionModal (visible = false, editUserIndex = 0) {
    const state = {permissionModalVisible: visible}

    if (visible) {
      state.editUserIndex = editUserIndex
    }

    this.setState(state) 
  }
  render () {
    const {
      searchParams,
      departments,
      roles,
      users,
      editUserIndex,
      pagination,
      userModalVisible,
      userModalType,
      updatePasswordModalVisible,
      permissionModalVisible
    } = this.state
    
    return (
      <div>
        <PageHeader title="人员管理"></PageHeader>
        <Card>
          <Search
            searchParams={searchParams}
            departments={departments}
            roles={roles}
            updateSearchParams={this.updateSearchParams}
            fetchUsers={this.fetchUsers}>
          </Search>
        </Card>
        <Card className="margin-top-xs">
          <div>
            <Button type="primary" onClick={() => this.toggleUserModal(true, 'create')}>增加人员</Button>
          </div>
          <div className="margin-top-xs">
            <Table
              pagination={pagination}
              users={users}
              openUserModal={(type, index) => this.toggleUserModal(true, type, index)}
              openUpdatePasswordModal={index => this.toggleUpdatePasswordModal(true, index)}
              openPermissionModal={index => this.togglePermissionModal(true, index)}
              fetchUsers={this.fetchUsers}>
            </Table>
          </div>
        </Card>
        <UserModal
          visible={userModalVisible}
          type={userModalType}
          hideModal={() => this.toggleUserModal(false)}
          departments={departments}
          roles={roles}
          fetchUsers={this.fetchUsers}
          user={userModalType === 'update' && users[editUserIndex] || {}}>
        </UserModal>
        <UpdatePasswordModal
          visible={updatePasswordModalVisible}
          hideModal={() => this.toggleUpdatePasswordModal(false)}
          fetchUsers={this.fetchUsers}
          userId={userModalType === 'update' && users[editUserIndex] && users[editUserIndex].id || -1}>
        </UpdatePasswordModal>
        <PermissionModal
          visible={permissionModalVisible}
          user={users[editUserIndex] || {}}
          fetchUsers={this.fetchUsers}
          hideModal={() => this.togglePermissionModal(false)}>
        </PermissionModal>
      </div>
    )
  }
  componentDidMount () {
    this.fetchDepartments()
    this.fetchRoles()
    this.fetchUsers()
  }
}

export default UserManage