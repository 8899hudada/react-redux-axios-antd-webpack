import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import { roleManageService } from '@services'

const FormItem = Form.Item
const title = {
  create: '增加角色',
  update: '编辑角色'
}
const submitAction = {
  create: roleManageService.createRole,
  update: roleManageService.updateRole
}

class RoleModal extends React.PureComponent {
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  static propTypes = {
    form: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    action: PropTypes.oneOf(['create', 'update']).isRequired,
    hideModal: PropTypes.func.isRequired,
    role: PropTypes.object, // 只有编辑时需要传递
    fetchRoles: PropTypes.func.isRequired
  }
  handleSubmit () {
    const { form, fetchRoles, action, role } = this.props

    form.validateFields(err => {
      const data = form.getFieldsValue()

      if (err) {
        return false
      }

      if (action === 'update') {
        data.id = role.id
      }
      
      submitAction[action](data).then(() => {
        this.hideModal()
        fetchRoles()
      })
    })
  }
  hideModal () {
    this.props.form.setFieldsValue({name: ''})
    this.props.hideModal()
  }
  componentWillReceiveProps (nextProps) {
    const { action, visible, role } = nextProps

    if (action === 'update' && visible && !this.props.visible && role) {
      this.props.form.setFieldsValue({name: role.name})
    }
  }
  handleChange (type, value) {
    setTimeout(() => {
      this.props.form.setFieldsValue({[type]: value.trim()})
      this.props.form.validateFields([type])
    }, 0)
  }
  render () {
    const { visible, action, form } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        title={title[action]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}>
        <Form>
          <FormItem label="角色名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  min: 1,
                  max: 8,
                  message: '请输入八个字符以内的角色名称'
                }
              ]
            })(
              <Input
                type="text"
                placeholder="请输入八个字符以内的角色名称"
                onChange={e => this.handleChange('name', e.target.value)} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(RoleModal)