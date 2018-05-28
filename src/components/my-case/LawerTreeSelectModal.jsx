import React from 'react'
import { TreeSelect } from '@components/common'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const data = [{
  label: '成都迪扬信风科技有限公司',
  value: '1',
  children: [{
    label: '开发部',
    value: '2',
    children: [{
      label: '舍甫琴科',
      value: '4'
    }, {
      label: '马尔蒂尼',
      value: '5'
    }]
  }, {
    label: '产品部',
    value: '3',
    children: [{
      label: '因扎吉',
      value: '6'
    }, {
      label: '皮尔洛',
      value: '7'
    }]
  }]
}]

class LawerTreeSelectModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      selectedKeys: []
    }
    this.onSelect = this.onSelect.bind(this)
  }
  onSelect (selectedKeys) {
    this.setState({ selectedKeys })
  }
  render () {
    const { selectedKeys } = this.state
    const { visible } = this.props
    return (
      <Modal
        title="案件转交"
        visible={visible}>
        <TreeSelect
          data={data}
          selectedKeys={selectedKeys}
          onSelect={this.onSelect} />
      </Modal>
    )
  }
}

export default LawerTreeSelectModal