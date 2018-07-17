import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input } from 'antd'
import { trustorService } from '@services'

const FormItem = Form.Item
const modalTitle = {
  update: '编辑委托方',
  create: '添加委托方'
}
const submitAction = {
  create: trustorService.createTrustor,
  update: trustorService.updateTrustor
}

class TrustorModal extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['update', 'create']).isRequired, // 委托方弹窗类型
    visible: PropTypes.bool, // 是否显示弹窗
    hideModal: PropTypes.func.isRequired, // 关闭弹窗
    fetchList: PropTypes.func.isRequired, // 关闭弹窗
    trustor: PropTypes.object, // 委托方
    form: PropTypes.object
  }
  constructor (props) {
    super(props)
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    const { visible, type, trustor } = nextProps

    if (visible && type === 'update' && !this.props.visible && trustor) {
      this.props.form.setFieldsValue({
        name: nextProps.trustor.name
      })
    }
  }
  handleSubmit () {
    const { form, type, fetchList, trustor } = this.props

    form.validateFields(err => {
      const data = form.getFieldsValue(['name'])

      if (err) {
        return false
      }

      if (type === 'update') {
        data.id = trustor.id
      }
      
      submitAction[type](data).then(() => {
        this.hideModal()
        fetchList()
      })
    })
  }
  hideModal () {
    this.setState({
      trustor: {
        id: '',
        name: ''
      }
    })
    this.props.form.setFieldsValue({
      name: ''
    })
    this.props.hideModal()
  }
  handleChange (type, value) {
    setTimeout(() => {
      this.props.form.setFieldsValue({[type]: value.trim()})
      this.props.form.validateFields([type])
    }, 0)
  }
  render () {
    const { visible, type, form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    }

    return (
      <Modal
        visible={visible}
        title={modalTitle[type]}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}>
        <Form>
          <FormItem {...formItemLayout} label="委托方名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  min: 1,
                  max: 20,
                  message: '请输入不超过20个字符的委托方名称',
                }
              ],
            })(
              <Input
                type="text"
                placeholder="请输入不超过20个字符的委托方名称"
                onChange={e => this.handleChange('name', e.target.value)} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(TrustorModal)