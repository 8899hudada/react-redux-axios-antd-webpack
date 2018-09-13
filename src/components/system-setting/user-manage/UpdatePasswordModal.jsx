import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import { userManageService } from '@services'

const FormItem = Form.Item

class UpdatePasswordModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    userId: PropTypes.number.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  handleSubmit () {
    const { form, userId } = this.props

    form.validateFields(err => {
      const data = form.getFieldsValue()

      if (err) {
        return false
      }
            
      userManageService.updateUserPassword(userId, data.password).then(() => {
        this.hideModal()
        this.props.fetchUsers()
      })
    })
  }
  hideModal () {
    this.props.form.resetFields()
    this.props.hideModal()
  }
  render () {
    const { form, visible } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal
        title="重置密码"
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}>
        <Form className="ant-form-item-flex">
          <FormItem label="新密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '6-16位字符或数字',
                  min: 6,
                  max: 16
                }
              ]
            })(
              <Input type="text" placeholder="6-16位字符或数字" />
            )}
          </FormItem>       
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(UpdatePasswordModal)