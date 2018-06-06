import React from 'react'
import { Card, Button } from 'antd'
import { Search, Table } from '@components/system-setting/user-manage'
import { PageHeader } from '@components/common'
import { departmentManageService, userManageService } from '@services'
import config from '@config'

class UserManage extends React.PureComponent {
  constructor (props) {
    super(props)
    
    this.fetchDepartments = this.fetchDepartments.bind(this)
    this.fetchRoles = this.fetchRoles.bind(this)
    this.fetchUsers = this.fetchUsers.bind(this)
    this.updatePagination = this.updatePagination.bind(this)
    this.updateSearchParams = this.updateSearchParams.bind(this)

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
      }
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
    departmentManageService.fetchRoles({
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
  render () {
    const { searchParams, departments, roles, users, pagination } = this.state
    
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
            <Button type="primary">增加人员</Button>
          </div>
          <div className="margin-top-xs">
            <Table pagination={pagination} users={users}></Table>
          </div>
        </Card>
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