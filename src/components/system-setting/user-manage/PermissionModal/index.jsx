import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Checkbox } from 'antd'
import { Tree } from '@components/common'
import { userManageService } from '@services'
import styles from './style'

const CheckboxGroup = Checkbox.Group
const menuPermissionTreeOptions = {
  labelKey: 'name',
  valueKey: 'id',
  childrenKey: 'children'
}

class PermissionModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    
    this.state = {
      casePermissions: [], // 案件权限列表
      menuPermissionTree: [], // 菜单权限树
      permissionParams: { // 编辑权限参数
        caseCheckeds: [], // 选中的案件权限
        menuCheckeds: [], // 选中的菜单权限
        havePerm: false // 默认下次添加该角色的权限
      }
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.fetchPermissionTree = this.fetchPermissionTree.bind(this)
    this.updatePermissionParams = this.updatePermissionParams.bind(this)
  }
  handleSubmit () {
    const { user, fetchUsers } = this.props
    const { casePermissions, permissionParams } = this.state
    const { havePerm, caseCheckeds, menuCheckeds } = permissionParams

    userManageService.updateUserPermission({
      userId: user.id,
      roleId: user.role.id,
      havePerm,
      perms: [
        ...casePermissions.filter(item => caseCheckeds.includes(item.id)),
        ...menuCheckeds
      ]
    }).then(() => {
      this.hideModal()
      fetchUsers()
    })
  }
  hideModal () {
    this.setState({
      permissionParams: {
        caseCheckeds: [],
        menuCheckeds: [],
        havePerm: false
      }
    })
    this.props.hideModal()
  }
  fetchPermissionTree () {
    userManageService.fetchPermissionTree().then(res => {
      const {
        casePerm: {children: casePermissions = []},
        menuPerm = {}
      } = res.data
      
      this.setState({
        casePermissions: casePermissions,
        menuPermissionTree: [menuPerm]
      })
    })
  }
  updatePermissionParams (key, checkeds) {
    this.setState({
      permissionParams: {
        ...this.state.permissionParams,
        [key]: checkeds
      }
    })
  }
  componentWillReceiveProps ({ visible, user }) {
    if (visible && !this.props.visible) {
      this.setState({
        permissionParams: {
          ...this.state.permissionParams,
          havePerm: user.role.havePerm,
          caseCheckeds: user.perms.filter(item => item.type === 0).map(item => item.id),
          menuCheckeds: user.perms.filter(item => item.type === 1)
        }
      })
    }
  }
  render () {
    const { casePermissions, menuPermissionTree, permissionParams } = this.state
    const { visible } = this.props
    const { caseCheckeds, menuCheckeds, havePerm } = permissionParams
    const casePermissionCheckboxs = casePermissions.map(casePermission => (
      <Checkbox key={casePermission.id} value={casePermission.id}>{casePermission.name}</Checkbox>
    ))
    
    return (
      <div>
        <Modal
          className={styles['permission-modal']}
          width={768}
          title="分配权限"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}>
          <div>
            <h4>案件权限</h4>
            <CheckboxGroup
              value={caseCheckeds}
              onChange={checkeds => this.updatePermissionParams('caseCheckeds', checkeds)}>
              {casePermissionCheckboxs}
            </CheckboxGroup>
          </div>
          <div className="margin-top-xs">
            <h4>菜单权限</h4>
            <Tree
              data={menuPermissionTree}
              option={menuPermissionTreeOptions}
              checkedKeys={menuCheckeds.map(item => item.id)}
              onCheck={(checkeds, e) => this.updatePermissionParams('menuCheckeds', e.checkedRealNodes)}
              checkable={true}
              defaultExpandAll={true}>
            </Tree>
          </div>
          <div className="text-right">
            <Checkbox checked={havePerm} onChange={e => this.updatePermissionParams('havePerm', e.target.checked)}>默认下次添加该角色的权限</Checkbox>
          </div>
        </Modal>
      </div>
    )
  }
  componentDidMount () {
    this.fetchPermissionTree()
  }
}

export default PermissionModal