import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'

const FormItem = Form.Item
const TextArea = Input.TextArea

class ExecInfo extends React.PureComponent {
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
        title="执行信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        style={style}>
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
                      initialValue: moment(params.executeAcceptDate)
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
                      initialValue: moment(params.executeEndDate)
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
                      initialValue: moment(params.settleAccountDate)
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
                        placeholder="请输入案件特殊情况备注" />
                    )
                    : <span>{params.remark}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="执行案件受理通知书">
              {
                getFieldDecorator('execNotice', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === 7).map(item => item.filePath),
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
                getFieldDecorator('lastJudgement', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === 8).map(item => item.filePath),
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

const WrappedExecInfo = Form.create()(ExecInfo)

export default WrappedExecInfo
