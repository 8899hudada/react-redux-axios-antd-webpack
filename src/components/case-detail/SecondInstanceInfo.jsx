import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, DatePicker, Input } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'

const FormItem = Form.Item
const TextArea = Input.TextArea

class SecondInstanceInfo extends React.PureComponent {
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
    this.setState({ isEdit: false })
  }
  onDelete () {
    const { params, localDelete } = this.props
    if (params.id) {
      console.log('删除')
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
        style={style}>
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="开庭时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('openCourtTime', {
                      initialValue: moment(params.openCourtTime)
                    })(
                      <DatePicker
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
            <FormItem label="二审传票">
              {
                getFieldDecorator('secondInstanceSummons', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === 5).map(item => item.filePath),
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
                  initialValue: params.attachments.filter(item => item.fileProperty === 6).map(item => item.filePath),
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

const WrappedSecondInstanceInfo = Form.create()(SecondInstanceInfo)

export default WrappedSecondInstanceInfo