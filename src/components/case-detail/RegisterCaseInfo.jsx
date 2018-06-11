import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'

const FormItem = Form.Item

class RegisterCaseInfo extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false
    }
    this.onEdit = this.onEdit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  onEdit () {
    this.setState({ isEdit: true })
  }
  onCancel () {
    this.setState({ isEdit: false })
  }
  onSave () {
    this.setState({ isEdit: false })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { isEdit } = this.state
    console.log(isEdit)
    return (
      <InfoCard
        title="立案信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}>
        <Form>
          <FormItem label="一审传票">
            {
              getFieldDecorator('firstInstanceSummons', {
                valuePropName: 'imgList',
                initialValue: ['http://www.remarkfin.com/static/cooper/cooper1.jpg'],
                getValueFromEvent: value => value
              })(
                <ImageListUpload
                  allowDelete={isEdit}
                  allowUpload={isEdit} />
              )
            }
          </FormItem>
        </Form>
      </InfoCard>
    )
  }
}

const WrappedRegisterCaseInfo = Form.create()(RegisterCaseInfo)

export default WrappedRegisterCaseInfo