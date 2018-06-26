import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker, InputNumber, Radio } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { REGEX } from '@constants'
import { fileProperties } from './constant'
import { caseDetailService } from '@services'
import { formatAttachments } from './utils'

const FormItem = Form.Item
const TextArea = Input.TextArea
const RadioGroup = Radio.Group

@Form.create()
class FirstInstanceInfo extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
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
        attachments: [
          ...formatAttachments(values.firstInstanceCitation, params.attachments, fileProperties.FIRST_INSTANCE_JUDGEMENT, caseId),
          ...formatAttachments(values.announcement, params.attachments, fileProperties.ANNOUNCEMENT, caseId),
          ...formatAttachments(values.firstInstanceJudgement, params.attachments, fileProperties.FIRST_INSTANCE_JUDGEMENT, caseId)
        ],
        openCourtTime: values.openCourtTime ? values.openCourtTime.format('YYYY-MM-DD hh:mm') : '',
        sealUpBeginDate: values.sealUpBeginDate ? values.sealUpBeginDate.format('YYYY-MM-DD') : '',
        sealUpEndDate: values.sealUpEndDate ? values.sealUpEndDate.format('YYYY-MM-DD') : '',
        judgePeriod: params.judgePeriod
      }
      caseDetailService.updateInstanceInfo(data).then(() => {
        fetchMethod().finally(() => this.setState({ isEdit: false }))
      })
    })
  }
  onDelete () {
    const { params, localDelete, fetchMethod, caseId } = this.props
    if (params.id) {
      caseDetailService.deleteInstanceInfo(params.id, {
        judgePeriod: params.judgePeriod,
        caseId
      }).then(() => {
        fetchMethod()
        localDelete('firstInstanceInfo')
      })
    } else {
      localDelete('firstInstanceInfo')
    }
  }
  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { params, style } = this.props
    const { isEdit } = this.state
    return (
      <InfoCard
        title="一审信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        onDelete={this.onDelete}
        style={style}
        id="firstInstanceInfo">
        <Form>
          <Row>
            <Col span={24}>
              <FormItem label="财产线索">
                {
                  isEdit
                    ? getFieldDecorator('assetsKey', {
                      initialValue: params.assetsKey
                    })(
                      <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        placeholder="请输入财产线索" />
                    )
                    : <span>{params.assetsKey}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="保全财产">
                {
                  isEdit
                    ? getFieldDecorator('guardAssets', {
                      initialValue: params.guardAssets
                    })(
                      <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        placeholder="请输入保全财产" />
                    )
                    : <span>{params.guardAssets}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="保全费" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('guardFee', {
                      initialValue: params.guardFee,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的保全费' }]
                    })(
                      <Input
                        placeholder="请输入保全费" />
                    )
                    : <span>{params.guardFee}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="保全金额" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('guardAmount', {
                      initialValue: params.guardAmount,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的保全金额' }]
                    })(
                      <Input
                        placeholder="请输入保全金额" />
                    )
                    : <span>{params.guardAmount}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="查封顺位" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('sealUpOrder', {
                      initialValue: params.sealUpOrder
                    })(
                      <InputNumber
                        precision={0}
                        placeholder="请输入查封顺位"
                        style={{ minWidth: 150 }} />
                    )
                    : <span>{params.sealUpOrder}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="开庭时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('openCourtTime', {
                      initialValue: params.openCourtTime ? moment(params.openCourtTime) : null
                    })(
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder="请输入开庭时间" />
                    )
                    : <span>{params.openCourtTime}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="开庭结果">
                {
                  isEdit
                    ? getFieldDecorator('openCourtResult', {
                      initialValue: params.openCourtResult
                    })(
                      <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        placeholder="请输入开庭结果" />
                    )
                    : <span>{params.openCourtResult}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="是否公告" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('isNotice', {
                      initialValue: params.isNotice
                    })(
                      <RadioGroup>
                        <Radio value={false}>是</Radio>
                        <Radio value={true}>否</Radio>
                      </RadioGroup>
                    )
                    : <span>{params.isNotice ? '是' : '否'}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="公告费" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('noticeFee', {
                      initialValue: params.noticeFee,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的公告费' }]
                    })(
                      <Input
                        placeholder="请输入公告费"
                        disabled={getFieldValue('isNotice')} />
                    )
                    : <span>{params.noticeFee}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="查封/冻结开始时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('sealUpBeginDate', {
                      initialValue: params.sealUpBeginDate ? moment(params.sealUpBeginDate) : null
                    })(
                      <DatePicker
                        placeholder="请输入查封/冻结开始时间" />
                    )
                    : <span>{params.sealUpBeginDate}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="查封/冻结结束时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('sealUpEndDate', {
                      initialValue: params.sealUpEndDate ? moment(params.sealUpEndDate) : null
                    })(
                      <DatePicker
                        placeholder="请输入查封/冻结结束时间" />
                    )
                    : <span>{params.sealUpEndDate}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="一审传票">
              {
                getFieldDecorator('firstInstanceCitation', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.FIRST_INSTANCE_CITATION).map(item => item.fileUrl),
                  getValueFromEvent: value => value
                })(
                  <ImageListUpload
                    allowDelete={isEdit}
                    allowUpload={isEdit} />
                )
              }
            </FormItem>
            <FormItem label="公告">
              {
                getFieldDecorator('announcement', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.ANNOUNCEMENT).map(item => item.fileUrl),
                  getValueFromEvent: value => value
                })(
                  <ImageListUpload
                    allowDelete={isEdit}
                    allowUpload={isEdit} />
                )
              }
            </FormItem>
            <FormItem label="一审判决书">
              {
                getFieldDecorator('firstInstanceJudgement', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.FIRST_INSTANCE_JUDGEMENT).map(item => item.fileUrl),
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

FirstInstanceInfo.defaultProps = {
  style: {}
}

export default FirstInstanceInfo