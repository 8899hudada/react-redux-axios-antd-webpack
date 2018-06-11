import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { REGEX } from '@constants'

const FormItem = Form.Item

class RegisterCaseInfo extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    params: PropTypes.object,
    style: PropTypes.object
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
    const { params, style } = this.props
    const { isEdit } = this.state
    return (
      <InfoCard
        title="立案信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        style={style}>
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="诉讼案号" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('lawCaseCode', {
                      initialValue: params.lawCaseCode
                    })(
                      <Input
                        placeholder="请输入诉讼案号" />
                    )
                    : <span>{params.lawCaseCode}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="受理法院" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('acceptCourt', {
                      initialValue: params.acceptCourt
                    })(
                      <Input
                        placeholder="请输入受理法院" />
                    )
                    : <span>{params.acceptCourt}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="法官姓名" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('judgeName', {
                      initialValue: params.judgeName
                    })(
                      <Input
                        placeholder="请输入法官姓名" />
                    )
                    : <span>{params.judgeName}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="立案时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('registerTime', {
                      initialValue: moment(params.registerTime)
                    })(
                      <DatePicker
                        placeholder="请输入立案时间" />
                    )
                    : <span>{params.registerTime}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="起诉金额" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('prosecutionAmount', {
                      initialValue: params.prosecutionAmount,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的起诉金额' }]
                    })(
                      <Input
                        placeholder="请输入起诉金额" />
                    )
                    : <span>{params.prosecutionAmount}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="诉讼费" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('legalCosts', {
                      initialValue: params.legalCosts,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的诉讼费' }]
                    })(
                      <Input
                        placeholder="请输入诉讼费" />
                    )
                    : <span>{params.legalCosts}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="律师费" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('lawyerFee', {
                      initialValue: params.lawyerFee,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的律师费' }]
                    })(
                      <Input
                        maxLength={16}
                        placeholder="请输入律师费" />
                    )
                    : <span>{params.lawyerFee}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="案件受理费" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('caseFee', {
                      initialValue: params.caseFee,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的案件受理费' }]
                    })(
                      <Input
                        placeholder="请输入案件受理费" />
                    )
                    : <span>{params.caseFee}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="受理通知书">
              {
                getFieldDecorator('acceptanceNotification', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.map(img => img.filePath),
                  getValueFromEvent: value => value
                })(
                  <ImageListUpload
                    allowDelete={isEdit}
                    allowUpload={isEdit} />
                )
              }
            </FormItem>
          </Row>
        </Form>
      </InfoCard>
    )
  }
}

RegisterCaseInfo.defaultProps = {
  style: {}
}

const WrappedRegisterCaseInfo = Form.create()(RegisterCaseInfo)

export default WrappedRegisterCaseInfo