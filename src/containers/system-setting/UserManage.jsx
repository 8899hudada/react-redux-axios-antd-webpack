import React from 'react'
import { Card } from 'antd'
import { Search } from '@components/system-setting/user-manage'
import { PageHeader } from '@components/common'

class UserManage extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      searchParams: {
        name: '', // 姓名
        phone: '', // 电话
        deptId: -1, // 部门id
        roleId: -1 // 角色id
      }
    }
  }
  render () {
    const { searchParams } = this.state

    return (
      <div>
        <PageHeader title="人员管理"></PageHeader>
        <Card>
          <Search searchParams={searchParams}></Search>
        </Card>
      </div>
    )
  }
}

export default UserManage