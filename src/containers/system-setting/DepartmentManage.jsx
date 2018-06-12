import React from 'react'
import { departmentManageService } from '@services'
import { TreeSelect } from '@components/common'

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
      selectedDepartmentKeys: [] //选中的部门树节点
    }

    this.fetchDepartmentTree = this.fetchDepartmentTree.bind(this)
    this.handleTreeSelect = this.handleTreeSelect.bind(this)
  }
  fetchDepartmentTree () {
    departmentManageService.fetchDepartmentTree().then(res => {
      this.setState({departmentTree: res.data})
    })
  }
  handleTreeSelect (type, selectedKeys) {
    this.setState({[type]: selectedKeys})
  }
  render () {
    const { departmentTree, selectedDepartmentKeys } = this.state
    console.log(departmentTree)
    return (
      <div>
        <TreeSelect
          data={departmentTree}
          selectedKeys={selectedDepartmentKeys}
          onSelect={selectedKeys => this.handleTreeSelect('selectedDepartmentKeys', selectedKeys)}
          option={treeOption}>
        </TreeSelect>
      </div>
    )
  }
  componentDidMount () {
    this.fetchDepartmentTree()
  }
}

export default DepartmentManage