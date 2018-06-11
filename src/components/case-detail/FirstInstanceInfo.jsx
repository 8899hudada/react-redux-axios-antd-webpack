import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker, InputNumber } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { REGEX } from '@constants'

const FormItem = Form.Item
const TextArea = Input.TextArea

class FirstInstanceInfo extends React.PureComponent {
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
      localDelete('firstInstanceInfo')
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
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
        style={style}>
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
            <FormItem label="一审传票">
              {
                getFieldDecorator('firstInstanceSummons', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === 2).map(item => item.filePath),
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
                getFieldDecorator('notice', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === 3).map(item => item.filePath),
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
                  initialValue: params.attachments.filter(item => item.fileProperty === 4).map(item => item.filePath),
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

const WrappedFirstInstanceInfo = Form.create()(FirstInstanceInfo)

export default WrappedFirstInstanceInfo