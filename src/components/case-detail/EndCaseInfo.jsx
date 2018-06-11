import React from 'react'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, DatePicker } from 'antd'
import { ImageListUpload } from '@components/common'
import PropTypes from 'prop-types'
import moment from 'moment'

const FormItem = Form.Item

class EndCaseInfo extends React.PureComponent {
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
        title="结案信息"
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}
        style={style}>
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="结案时间" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('closeCaseDate', {
                      initialValue: moment(params.closeCaseDate)
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
                getFieldDecorator('endCasePaper', {
                  valuePropName: 'imgList',
                  initialValue: params.attachments.filter(item => item.fileProperty === 9).map(item => item.filePath),
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

const WrappedEndCaseInfo = Form.create()(EndCaseInfo)

export default WrappedEndCaseInfo
