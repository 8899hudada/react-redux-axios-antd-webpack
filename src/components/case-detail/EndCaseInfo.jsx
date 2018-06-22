import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, DatePicker } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fileProperties } from './constant'
import { caseDetailService } from '@services'

const FormItem = Form.Item

@Form.create()
class EndCaseInfo extends React.PureComponent {
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
        attachments: [
          ...values.mediationAgreement.map(item => ({ filePath: item, fileProperty: fileProperties.MEDIATION_AGREEMENT, caseId }))
        ],
        closeCaseDate: values.executeAcceptDate ? values.executeAcceptDate.format('YYYY-MM-DD') : ''
      }
      caseDetailService.updateEndCaseInfo(data).then(() => {
        fetchMethod().finally(() => this.setState({ isEdit: false }))
      })
    })
  }
  onDelete () {
    const { params, localDelete, fetchMethod } = this.props
    if (params.id) {
      caseDetailService.deleteEndCaseInfo(params.id).then(() => {
        fetchMethod()
        localDelete('endCaseInfo')
      })
    } else {
      localDelete('endCaseInfo')
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { params, style } = this.props
    const { isEdit } = this.state
    return (
      <InfoCard
        title="结案信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        onDelete={this.onDelete}
        style={style}
        id="endCaseInfo">
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="结案时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('closeCaseDate', {
                      initialValue: params.closeCaseDate ? moment(params.closeCaseDate) : null
                    })(
                      <DatePicker
                        placeholder="请输入结案时间" />
                    )
                    : <span>{params.closeCaseDate}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="调解书/结案文书">
              {
                getFieldDecorator('mediationAgreement', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === fileProperties.MEDIATION_AGREEMENT).map(item => item.filePath),
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

EndCaseInfo.defaultProps = {
  style: {}
}

export default EndCaseInfo
