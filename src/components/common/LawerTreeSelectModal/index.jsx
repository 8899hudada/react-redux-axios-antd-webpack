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
    onCancel: PropTypes.func,
    submitMethod: PropTypes.func,
    unselectedTips: PropTypes.string,
    confrimContent: PropTypes.string,
    title: PropTypes.string
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
  submit (selectedKey) {
    this.setState({ confirmLoading: true })
    this.props.submitMethod(selectedKey).then(() => {
      this.props.onCancel()
      this.setState({ confirmLoading: false })
    })
  }
  onOk () {
    const { selectedKeys } = this.state
    const { unselectedTips, confrimContent } = this.props
    if (selectedKeys.length === 0) return message.warning(unselectedTips)
    const selectedNode = findNodeInTree(data, { key: 'value', value: selectedKeys[0] })
    Modal.confirm({
      title: '提示',
      content: `${confrimContent}【${selectedNode.label}】？`,
      onOk: () => this.submit(selectedKeys[0]) 
    })
  }
  render () {
    const { selectedKeys, confirmLoading } = this.state
    const { visible, onCancel, title } = this.props
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        okText={confirmLoading ? '提交中...' : '确定'}>
        <TreeSelect
          data={data}
          selectedKeys={selectedKeys}
          onSelect={this.onSelect}
          placeholder="请输入部门或姓名" />
      </Modal>
    )
  }
}

LawerTreeSelectModal.defaultProps = {
  visible: false,
  onCancel: () => {},
  title: '选择',
  unselectedTips: '请选择操作对象',
  confrimContent: '确定该选择',
  submitMethod: () => new Promise(resolve => setTimeout(() => resolve(), 1000))
}

export default LawerTreeSelectModal