import React from 'react'
import { departmentManageService } from '@services'
import { Tree, Confirm, PageHeader } from '@components/common'
import { Card, Button } from 'antd'
import { DepartmentModal, Role } from '@components/system-setting/department-manage'
import styles from './style'
import { formatTreeData } from './utils'

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
      editDepartment: null, // 编辑的部门
      departmentTreeLoading: false
    }

    this.fetchDepartmentTree = this.fetchDepartmentTree.bind(this)
    this.handleTreeSelect = this.handleTreeSelect.bind(this)
    this.createDepartment = this.createDepartment.bind(this)
    this.deleteDepartment = this.deleteDepartment.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.updateDepartment = this.updateDepartment.bind(this)
  }
  fetchDepartmentTree () {
    this.setState({ departmentTreeLoading: true })
    departmentManageService.fetchDepartmentTree().then(res => {
      this.setState({departmentTree: formatTreeData(res.data || [])})
    }).finally(() => this.setState({ departmentTreeLoading: false }))
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
    const { departmentTree, selectedDepartmentKeys, visibleDepartmentModal, departmentModalAction, editDepartment, departmentTreeLoading } = this.state
    const NodeTitle = props => {
      return (
        <div className={styles['tree-node-title']}>
          <span>{props.name}</span>
          {
            props.children ? (
              <div className={styles['action']}>
                <Button
                  type="primary"
                  size="small"
                  className="margin-left-xs"
                  icon="plus-circle"
                  onClick={() => this.createDepartment(props.id)}>
                  添加子部门
                </Button>
                <Button
                  type="primary"
                  size="small"
                  className="margin-left-xs"
                  icon="edit"
                  onClick={() => this.updateDepartment(props)}>
                  编辑部门
                </Button>
                <Confirm options={{onOk: () => this.deleteDepartment(props.id)}}>
                  <Button
                    type="danger"
                    size="small"
                    className="margin-left-xs"
                    icon="minus-circle">
                    删除部门
                  </Button>
                </Confirm>
              </div>
            ) : null
          }
        </div>
      )
    }
    
    return (
      <div>
        <PageHeader title="部门管理"></PageHeader>
        <Card title="部门管理" loading={departmentTreeLoading}>
          {
            departmentTree.length ? (
              <Tree
                className={styles['department-tree']}
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
        <Role></Role>
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