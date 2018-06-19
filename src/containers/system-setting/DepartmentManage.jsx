import React from 'react'
import { departmentManageService } from '@services'
import { Tree, Confirm, PageHeader } from '@components/common'
import { Icon, Card } from 'antd'
import { DepartmentModal } from '@components/system-setting/department-manage'

const treeOption = {
  labelKey: 'name',
  valueKey: 'id',
  childrenKey: 'children'
}

class DepartmentManage extends React.PureComponent {
  constructor (props) {
    super(props)
    
    this.state = {
      departmentTree: [], // 部门树
      selectedDepartmentKeys: [], //选中的部门树节点
      visibleDepartmentModal: false, // 显示部门弹窗
      departmentModalAction: 'create', // 部门弹窗动作 [update: 编辑， create: 新增]
      editDepartment: null // 编辑的部门
    }

    this.fetchDepartmentTree = this.fetchDepartmentTree.bind(this)
    this.handleTreeSelect = this.handleTreeSelect.bind(this)
    this.createDepartment = this.createDepartment.bind(this)
    this.deleteDepartment = this.deleteDepartment.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.updateDepartment = this.updateDepartment.bind(this)
  }
  fetchDepartmentTree () {
    departmentManageService.fetchDepartmentTree().then(res => {
      this.setState({departmentTree: []})
      this.setState({departmentTree: res.data || []})
    })
  }
  handleTreeSelect (type, selectedKeys) {
    this.setState({[type]: selectedKeys})
  }
  createDepartment () {
    this.setState({departmentModalAction: 'create'})
    this.toggleModal('visibleDepartmentModal', true)
  }
  updateDepartment (editDepartment = {}) {
    this.setState({
      departmentModalAction: 'update',
      editDepartment
    })
    this.toggleModal('visibleDepartmentModal', true)
  }
  deleteDepartment (id) {
    departmentManageService.deleteDepartment(id).then(() => {
      this.fetchDepartmentTree()
    })
  }
  toggleModal (type, visible) {
    this.setState({[type]: visible})
  }
  render () {
    const { departmentTree, selectedDepartmentKeys, visibleDepartmentModal, departmentModalAction, editDepartment } = this.state
    const NodeTitle = props => {
      return (
        <div>
          <span>{props.name}</span>
          <Icon
            onClick={() => this.createDepartment(props.id)}
            className="margin-left-xs text-primary"
            type="plus-circle" />
          <Icon
            onClick={() => this.updateDepartment(props)}
            className="margin-left-xs text-primary"
            type="edit" />
          <Confirm options={{onOk: () => this.deleteDepartment(props.id)}}>
            <Icon className="margin-left-xs text-error" type="minus-circle" />
          </Confirm>
        </div>
      )
    }
    
    return (
      <div>
        <PageHeader title="部门管理"></PageHeader>
        <Card title="部门管理">
          {
            departmentTree.length ? (
              <Tree
                data={departmentTree}
                selectedKeys={selectedDepartmentKeys}
                onSelect={selectedKeys => this.handleTreeSelect('selectedDepartmentKeys', selectedKeys)}
                option={treeOption}
                NodeTitle={NodeTitle}
                defaultExpandAll={true}>
              </Tree>
            ) : null
          }
        </Card>
        <Card className="margin-top-xs" title="角色管理">
          <div>ddd</div>
        </Card>
        <DepartmentModal
          visible={visibleDepartmentModal}
          action={departmentModalAction}
          hideModal={() => this.toggleModal('visibleDepartmentModal', false)}
          fetchDepartmentTree={this.fetchDepartmentTree}
          department={editDepartment}>
        </DepartmentModal>
      </div>
    )
  }
  componentDidMount () {
    this.fetchDepartmentTree()
  }
}

export default DepartmentManage