import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

class UserModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(['create', 'update']).isRequired,
    hideModal: PropTypes.func.isRequired
  }
  handleSubmit () {

  }
  render () {
    const { visible, hideModal } = this.props

    return (
      <Modal
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={hideModal}>
        dddd
      </Modal>
    )
  }
}

export default UserModal