import React from 'react'
import { Card } from 'antd'
import { Search } from '@components/system-setting/user-manage'
import { PageHeader } from '@components/common'

class UserManage extends React.PureComponent {
  render () {
    return (
      <div>
        <PageHeader title="人员管理"></PageHeader>
        <Card>
          <Search></Search>
        </Card>
      </div>
    )
  }
}

export default UserManage