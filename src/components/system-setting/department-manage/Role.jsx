import React from 'react'
import { Card, Table, Button } from 'antd'
import { TableIndex, Confirm } from '@components/common'
import RoleModal from './RoleModal'
import { roleManageService } from '@services'

class Role extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      roles: [], // 角色列表
      visibleRoleModal: false, // 显示角色弹窗
      roleModalAction: 'create', // 角色弹窗动作
      editRoleIndex: -1, // 编辑的角色序号
      loading: false
    }

    this.fetchRoles = this.fetchRoles.bind(this)
    this.deleteRole = this.deleteRole.bind(this)
  }
  fetchRoles () {
    this.setState({ loading: true })
    roleManageService.fetchRoles({
      current: 1,
      pageSize: 500
    }).then(res => {
      this.setState({roles: res.data.pageData || []})
    }).finally(() => this.setState({ loading: false }))
  }
  deleteRole (id) {
    roleManageService.deleteRole(id).then(() => {
      this.fetchRoles()
    })
  }
  toggleRoleModal (visibleRoleModal, roleModalAction = 'create', editRoleIndex = -1) {
    this.setState({
      visibleRoleModal,
      roleModalAction,
      editRoleIndex
    })
  }
  render () {
    const { roles, visibleRoleModal, roleModalAction, editRoleIndex, loading } = this.state
    const columns = [
      {
        title: '序号',
        render: TableIndex,
        dataIndex: 'index',
        align: 'center'
      },
      {
        title: '角色名称',
        dataIndex : 'name',
        align: 'center'
      },
      {
        title: '操作',
        render: (text, record, index) => {
          return (
            <div>
              <Button
                type="primary"
                className="margin-right-xs"
                onClick={() => this.toggleRoleModal(true, 'update', index)}>
                编辑
              </Button>
              <Confirm options={{onOk: () => this.deleteRole(record.id)}}>
                <Button type="danger" className="margin-right-xs">删除</Button>
              </Confirm>
            </div>
          )
        },
        dataIndex: 'operation',
        align: 'center'
      }
    ]
    const cardTitle = (
      <div>
        <span>角色管理</span>
        <Button
          type="primary"
          className="margin-left-xs"
          onClick={() => this.toggleRoleModal(true, 'create')}>
          增加角色
        </Button>
      </div>
    )
    return (
      <Card className="margin-top-xs" title={cardTitle}>
        <Table
          loading={loading}
          dataSource={roles}
          columns={columns}
          pagination={false}
          rowKey='id'>
        </Table>
        <RoleModal
          visible={visibleRoleModal}
          action={roleModalAction}
          hideModal={() => this.toggleRoleModal(false)}
          role={roles[editRoleIndex]}
          fetchRoles={this.fetchRoles}>
        </RoleModal>
      </Card>
    )
  }
  componentDidMount () {
    this.fetchRoles()
  }
}

export default Role