import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Checkbox, Row, Col, message } from 'antd'
import { FILE_PROPERTIES } from './constant'
import { API_URL, API_ROOT } from '@constants'

const CheckboxGroup = Checkbox.Group

class AttachmentDownloadModal extends React.PureComponent {
  static propTypes = {
    attachments: PropTypes.array,
    caseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      checkedKeys: []
    }
    this.onChange = this.onChange.bind(this)
    this.onOk = this.onOk.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }
  show () {
    const { attachments } = this.props
    if (attachments.length === 0) return message.info('暂无可下载附件')
    this.setState({
      visible: true,
      checkedKeys: []
    })
  }
  hide () {
    this.setState({ visible: false })
  }
  onChange (checkedKeys) {
    this.setState({ checkedKeys })
  }
  onOk () {
    const { caseId } = this.props
    const { checkedKeys } = this.state
    if (checkedKeys.length === 0) return message.info('请选择需下载的附件')
    window.open(`${API_ROOT[process.env.ENV]}/${API_URL.caseDetail.DOWNLOAD_ATTACHMENTS(caseId, checkedKeys.join(','))}`)
    this.hide()
  }
  render () {
    const { visible, checkedKeys } = this.state
    const { attachments } = this.props
    return (
      <Modal
        title="附件下载"
        width={700}
        visible={visible}
        onCancel={this.hide}
        onOk={this.onOk}>
        <h4>选择要下载的附件内容</h4>
        <CheckboxGroup
          value={checkedKeys}
          onChange={this.onChange}>
          <Row>
            {
              FILE_PROPERTIES
                .filter(item => attachments.includes(item.value))
                .map(item => <Col span={8} key={item.value}><Checkbox value={item.value}>{item.label}</Checkbox></Col>)
            }
          </Row>
        </CheckboxGroup>
      </Modal>
    )
  }
}

AttachmentDownloadModal.defaultProps = {
  attachments: []
}

export default AttachmentDownloadModal