import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Row, Col, Select } from 'antd'
import { userManageService } from '@services'

const FormItem = Form.Item
const Option = Select.Option

const title = {
  create: '新增人员',
  update: '编辑人员'
}

const submitAction = {
  create: userManageService.createUser,
  update: userManageService.updateUser
}

class UserModal extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['create', 'update']).isRequired,
    hideModal: PropTypes.func.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string, // 员工姓名
      phone: PropTypes.string, // 员工电话
      loginName: PropTypes.string, // 登录账号
      dept: PropTypes.object, // 部门
      role: PropTypes.object, // 角色
      passwd: PropTypes.string, // 密码
    }),
    departments: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  handleSubmit () {
    const { form, type, departments, roles, fetchUsers, user } = this.props

    form.validateFields(err => {
      const data = form.getFieldsValue()
      
      if (err) {
        return false
      }
      
      data.dept = departments.find(department => department.id === data.dept)
      data.role = roles.find(role => role.id === data.role)

      if (type === 'update') {
        data.id = user.id
        data.passwd = user.passwd
      }
      
      submitAction[type](data).then(() => {
        this.hideModal()
        fetchUsers()
      })
    })
  }
  hideModal () {
    this.props.form.resetFields()
    this.props.hideModal()
  }
  render () {
    const { form, visible, type, departments, roles, user } = this.props
    const { getFieldDecorator } = form
    
    const departmentOptions = departments.map(department => (
      <Option key={department.id} value={department.id}>{department.name}</Option>
    ))   

    const roleOptions = roles.map(role => (
      <Option key={role.id} value={role.id}>{role.name}</Option>
    ))

    return (
      <Modal
        width={768}
        title={title[type]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}>
        <Form className="ant-form-item-flex">
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="员工姓名">
                {getFieldDecorator('name', {
                  initialValue: user.name,
                  rules: [
                    {
                      required: true,
                      message: '请输入员工姓名'
                    }
                  ]
                })(
                  <Input type="text" placeholder="请输入员工姓名" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="选择部门">
                {getFieldDecorator('dept', {
                  initialValue: user.dept ? user.dept.id : '',
                  rules: [
                    {
                      required: true,
                      message: '请选择部门'
                    }
                  ]
                })(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    dropdownMatchSelectWidth={false}>
                    {departmentOptions}
                  </Select> 
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="员工电话">
                {getFieldDecorator('phone', {
                  initialValue: user.phone,
                  rules: [
                    {
                      required: true,
                      message: '请输入员工电话',
                    }
                  ]
                })(
                  <Input type="text" placeholder="请输入员工电话" />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="选择角色">
                {getFieldDecorator('role', {
                  initialValue: user.role ? user.role.id : '',
                  rules: [
                    {
                      required: true,
                      message: '请选择角色'
                    }
                  ]
                })(
                  <Select
                    placeholder="请选择"
                    allowClear={true}
                    dropdownMatchSelectWidth={false}>
                    {roleOptions}
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <FormItem label="登录账号">
                {getFieldDecorator('loginName', {
                  initialValue: user.loginName,
                  rules: [
                    {
                      required: true,
                      message: '请输入登录账号'
                    }
                  ]
                })(
                  <Input type="text" placeholder="请输入登录账号" />
                )}
              </FormItem>
            </Col>
            {
              type === 'create' ? (
                <Col span={12}>
                  <FormItem label="登录密码">
                    <Input className="remove-input-password-fill" type="password" />
                    {getFieldDecorator('passwd', {
                      initialValue: user.passwd,
                      rules: [
                        {
                          required: true,
                          message: '请输入登录密码'
                        }
                      ]
                    })(
                      <Input type="password" placeholder="6-16位字符或数字" />
                    )}
                  </FormItem>
                </Col>
              ) : null
            }
          </Row>          
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(UserModal)