import React from 'react'
import { Card, Button } from 'antd'
import { Search, Table } from '@components/system-setting/user-manage'
import { PageHeader } from '@components/common'
import { departmentManageService, userManageService } from '@services'

class UserManage extends React.PureComponent {
  constructor (props) {
    super(props)
    
    this.handlePageChange = this.handlePageChange.bind(this)

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
        current: 1, // 当前页数
        pageSize: 10, // 一页的条数
        total: 0, // 用户总条数
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: this.handlePageChange
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
  fetchUsers (data) {
    userManageService.fetchUsers(data).then(res => {
      this.setState({
        users: res.data.pageData,
        pagination: {
          ...this.state.pagination,
          total: res.data.total
        }
      })
    })
  }
  handlePageChange (current) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        current
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
            roles={roles}>
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
    this.fetchUsers({pageSize: 20})
  }
}

export default UserManage