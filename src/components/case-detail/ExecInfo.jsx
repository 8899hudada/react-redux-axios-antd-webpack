import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker } from 'antd'
import { ImageListUpload, TextArea } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fileProperties } from './constant'
import { caseDetailService } from '@services'
import { formatAttachments } from './utils'

const FormItem = Form.Item

@Form.create()
class ExecInfo extends React.PureComponent {
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
    const { params, localDelete } = this.props
    if (!params.id) {
      localDelete('execInfo')
    }
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
          ...formatAttachments(values.executeCaseNotification, params.attachments, fileProperties.EXECUTE_CASE_NOTIFICATION, caseId),
          ...formatAttachments(values.finalWrittenVerdict, params.attachments, fileProperties.FINAL_WRITTEN_VERDICT, caseId)
        ],
        executeAcceptDate: values.executeAcceptDate ? values.executeAcceptDate.format('YYYY-MM-DD') : '',
        executeEndDate: values.executeEndDate ? values.executeEndDate.format('YYYY-MM-DD') : '',
        settleAccountDate: values.settleAccountDate ? values.settleAccountDate.format('YYYY-MM-DD') : ''
      }
      caseDetailService.updateExecInfo(data).then(() => {
        fetchMethod().finally(() => this.setState({ isEdit: false }))
      })
    })
  }
  onDelete () {
    const { params, localDelete, fetchMethod, caseId } = this.props
    if (params.id) {
      caseDetailService.deleteExecInfo(params.id, { caseId }).then(() => {
        fetchMethod()
        localDelete('execInfo')
      })
    } else {
      localDelete('execInfo')
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { params, style } = this.props
    const { isEdit } = this.state
    return (
      <InfoCard
        title="执行信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        onDelete={this.onDelete}
        style={style}
        id="execInfo">
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="执行案号" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('executeCaseCode', {
                      initialValue: params.executeCaseCode
                    })(
                      <Input
                        placeholder="请输入执行案号" />
                    )
                    : <span>{params.executeCaseCode}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="执行受理时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('executeAcceptDate', {
                      initialValue: params.executeAcceptDate ? moment(params.executeAcceptDate) : null
                    })(
                      <DatePicker
                        placeholder="请输入执行受理时间" />
                    )
                    : <span>{params.executeAcceptDate}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="执行时效" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('executePrescription', {
                      initialValue: params.executePrescription
                    })(
                      <Input
                        placeholder="请输入执行时效" />
                    )
                    : <span>{params.executePrescription}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="终结执行裁定时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('executeEndDate', {
                      initialValue: params.executeEndDate ? moment(params.executeEndDate) : null
                    })(
                      <DatePicker
                        placeholder="请选择终结执行裁定时间" />
                    )
                    : <span>{params.executeEndDate}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="结清销户时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('settleAccountDate', {
                      initialValue: params.settleAccountDate ? moment(params.settleAccountDate) : null
                    })(
                      <DatePicker
                        placeholder="请选择结清销户时间" />
                    )
                    : <span>{params.settleAccountDate}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="回款金额" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('receivedPaymentAmount', {
                      initialValue: params.receivedPaymentAmount
                    })(
                      <Input
                        placeholder="请输入回款金额" />
                    )
                    : <span>{params.receivedPaymentAmount}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <FormItem label="案件特殊情况备注">
                {
                  isEdit
                    ? getFieldDecorator('remark', {
                      initialValue: params.remark
                    })(
                      <TextArea
                        autosize={{ minRows: 2, maxRows: 6 }}
                        maxLength={500}
                        placeholder="请输入案件特殊情况备注" />
                    )
                    : <div className="line-height-24">{params.remark}</div>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="执行案件受理通知书">
              {
                getFieldDecorator('executeCaseNotification', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.EXECUTE_CASE_NOTIFICATION).map(item => item.fileUrl),
                  getValueFromEvent: value => value
                })(
                  <ImageListUpload
                    allowDelete={isEdit}
                    allowUpload={isEdit} />
                )
              }
            </FormItem>
            <FormItem label="终本裁定书">
              {
                getFieldDecorator('finalWrittenVerdict', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.FINAL_WRITTEN_VERDICT).map(item => item.fileUrl),
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

ExecInfo.defaultProps = {
  style: {}
}

export default ExecInfo
