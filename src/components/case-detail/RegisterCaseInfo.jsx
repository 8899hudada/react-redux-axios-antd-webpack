import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { REGEX } from '@constants'
import { fileProperties } from './constant'
import { caseDetailService } from '@services'

const FormItem = Form.Item

@Form.create()
class RegisterCaseInfo extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    params: PropTypes.object,
    style: PropTypes.object,
    fetchMethod: PropTypes.func,
    caseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    localDelete: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false
    }
    this.onEdit = this.onEdit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  onEdit () {
    this.setState({ isEdit: true })
  }
  onCancel () {
    this.setState({ isEdit: false })
  }
  onSave () {
    const { form, params, caseId, fetchMethod } = this.props
    form.validateFields((err, values) => {
      if (err) return false
      const data = {
        ...values,
        id: params.id ? params.id : null,
        caseId,
        registerTime: values.registerTime ? values.registerTime.format('YYYY-MM-DD') : '',
        attachments: values.acceptanceNotification.map(item => ({
          filePath: item,
          fileProperty: fileProperties.ACCEPTED_NOTICE,
          caseId
        }))
      }
      caseDetailService.updateRegisterCaseInfo(data).then(() => {
        fetchMethod().finally(() => this.setState({ isEdit: false }))
      })
    })
  }
  onDelete () {
    const { params, localDelete, fetchMethod } = this.props
    if (params.id) {
      caseDetailService.deleteRegisterCaseInfo(params.id).then(() => {
        fetchMethod()
        localDelete('registerCaseInfo')
      })
    } else {
      localDelete('registerCaseInfo')
    }
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
        onDelete={this.onDelete}
        style={style}
        id="registerCaseInfo">
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
              <FormItem label="法官电话" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('judgePhone', {
                      initialValue: params.judgePhone
                    })(
                      <Input
                        placeholder="请输入法官电话" />
                    )
                    : <span>{params.judgePhone}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="法官助理姓名" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('judgeAssistName', {
                      initialValue: params.judgeAssistName
                    })(
                      <Input
                        placeholder="请输入法官助理姓名" />
                    )
                    : <span>{params.judgeAssistName}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="法官助理电话" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('judgeAssistPhone', {
                      initialValue: params.judgeAssistPhone
                    })(
                      <Input
                        placeholder="请输入法官助理电话" />
                    )
                    : <span>{params.judgeAssistPhone}</span>
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
                      initialValue: params.registerTime ? moment(params.registerTime) : null
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

export default RegisterCaseInfo