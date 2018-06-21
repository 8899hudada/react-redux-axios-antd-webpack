import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select } from 'antd'
import { departmentManageService } from '@services'

const Option = Select.Option
const FormItem = Form.Item
const title = {
  update: '编辑部门',
  create: '增加部门'
}
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}
const submitAction = {
  create: departmentManageService.createDepartment,
  update: departmentManageService.updateDepartment
}

class DepartmentModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    action: PropTypes.oneOf(['update', 'create']).isRequired,
    form: PropTypes.object.isRequired,
    hideModal: PropTypes.func.isRequired,
    fetchDepartmentTree: PropTypes.func.isRequired,
    department: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      parentId: PropTypes.number.isRequired
    })
  }
  constructor (props) {
    super(props)

    this.state = {
      departments: [] // 部门列表
    }

    this.fetchDepartments = this.fetchDepartments.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  fetchDepartments () {
    departmentManageService.fetchDepartments({
      current: 1,
      pageSize: 500
    }).then(res => {
      this.setState({departments: res.data.pageData || []})
    })
  }
  hideModal () {
    this.props.form.setFieldsValue({
      name: '',
      parentId: ''
    })
    this.props.hideModal()
  }
  handleSubmit () {
    const { form, action, fetchDepartmentTree, department } = this.props

    form.validateFields(err => {
      let data = form.getFieldsValue()

      if (err) {
        return false
      }

      if (action === 'update') {
        data = {
          ...department,
          ...data
        }
      }
      
      submitAction[action](data).then(() => {
        this.hideModal()
        fetchDepartmentTree()
      })
    })
  }
  componentWillReceiveProps (nextProps) {
    const { visible, action, department } = nextProps
    
    if (visible && action === 'update' && !this.props.visible && department) {
      this.props.form.setFieldsValue({
        name: nextProps.department.name,
        parentId: nextProps.department.parentId
      })
    }
  }
  render () {
    const { departments } = this.state
    const { visible, action, form } = this.props
    const { getFieldDecorator } = form
    const departmentOptions = departments.map(department => (
      <Option key={department.id} value={department.id}>{department.name}</Option>
    ))

    return (
      <Modal
        visible={visible}
        title={title[action]}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}>
        <Form>
          <FormItem {...formItemLayout} label="部门名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入部门名称',
                }
              ],
            })(
              <Input type="text" placeholder="请输入部门名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属部门">
            {getFieldDecorator('parentId', {
              rules: [
                {
                  required: true,
                  message: '请选择所属部门',
                }
              ],
            })(
              <Select
                placeholder="请选择所属部门"
                allowClear={true}
                showSearch={true}>
                {departmentOptions}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
  componentDidMount () {
    this.fetchDepartments()
  }
}

export default Form.create()(DepartmentModal)