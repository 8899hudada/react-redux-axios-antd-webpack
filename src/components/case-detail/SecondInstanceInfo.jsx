import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, DatePicker } from 'antd'
import { ImageListUpload, TextArea } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fileProperties } from './constant'
import { caseDetailService } from '@services'
import { formatAttachments } from './utils'

const FormItem = Form.Item

@Form.create()
class SecondInstanceInfo extends React.PureComponent {
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
      localDelete('secondInstanceInfo')
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
          ...formatAttachments(values.secondInstanceCitation, params.attachments, fileProperties.SECOND_INSTANCE_CITATION, caseId),
          ...formatAttachments(values.secondInstanceJudgement, params.attachments, fileProperties.SECOND_INSTANCE_JUDGEMENT, caseId)
        ],
        openCourtTime: values.openCourtTime ? values.openCourtTime.format('YYYY-MM-DD hh:mm') : '',
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
        localDelete('secondInstanceInfo')
      })
    } else {
      localDelete('secondInstanceInfo')
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { params, style } = this.props
    const { isEdit } = this.state
    return (
      <InfoCard
        title="二审信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        onDelete={this.onDelete}
        style={style}
        id="secondInstanceInfo">
        <Form>
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
                        maxLength={500}
                        placeholder="请输入开庭结果" />
                    )
                    : <span>{params.openCourtResult}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="二审传票">
              {
                getFieldDecorator('secondInstanceCitation', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.SECOND_INSTANCE_CITATION).map(item => item.fileUrl),
                  getValueFromEvent: value => value
                })(
                  <ImageListUpload
                    allowDelete={isEdit}
                    allowUpload={isEdit} />
                )
              }
            </FormItem>
            <FormItem label="二审判决书">
              {
                getFieldDecorator('secondInstanceJudgement', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.SECOND_INSTANCE_JUDGEMENT).map(item => item.fileUrl),
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

SecondInstanceInfo.defaultProps = {
  style: {}
}

export default SecondInstanceInfo