import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

class PermissionModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
  handleSubmit () {
    this.props.hideModal()
  }
  hideModal () {
    this.props.hideModal()
  }
  render () {
    const { visible } = this.props

    return (
      <div>
        <Modal
          width={768}
          title="分配权限"
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}>
        </Modal>
      </div>
    )
  }
}

export default PermissionModal