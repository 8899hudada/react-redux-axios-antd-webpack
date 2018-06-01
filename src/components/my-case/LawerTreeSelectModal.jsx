import React from 'react'
import { TreeSelect } from '@components/common'
import { Modal, message } from 'antd'
import PropTypes from 'prop-types'
import { findNodeInTree } from '@utils'

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
    visible: PropTypes.bool,
    onCancel: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      selectedKeys: [],
      confirmLoading: false
    }
    this.onSelect = this.onSelect.bind(this)
    this.onOk = this.onOk.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.visible && !nextProps.visible) {
      this.setState({ selectedKeys: [] })
    }
  }
  onSelect (selectedKeys) {
    this.setState({ selectedKeys })
  }
  submit () {
    this.setState({ confirmLoading: true })
    setTimeout(() => {
      this.props.onCancel()
      this.setState({ confirmLoading: false })
    }, 2000)
  }
  onOk () {
    const { selectedKeys } = this.state
    if (selectedKeys.length === 0) return message.warning('请选择转交对象')
    const selectedNode = findNodeInTree(data, { key: 'value', value: selectedKeys[0] })
    Modal.confirm({
      title: '提示',
      content: `确定将案件转交给${selectedNode.label}？`,
      onOk: () => this.submit() 
    })
  }
  render () {
    const { selectedKeys, confirmLoading } = this.state
    const { visible, onCancel } = this.props
    return (
      <Modal
        title="案件转交"
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        okText={confirmLoading ? '提交中...' : '确定'}>
        <TreeSelect
          data={data}
          selectedKeys={selectedKeys}
          onSelect={this.onSelect}
          placeholder="请输入部门或律师姓名" />
      </Modal>
    )
  }
}

LawerTreeSelectModal.defaultProps = {
  visible: false,
  onCancel: () => {}
}

export default LawerTreeSelectModal