import React from 'react'
import { Tree } from '@components/common'
import { Modal, message } from 'antd'
import PropTypes from 'prop-types'
import { findNodeInTree } from '@utils'
import { departmentManageService } from '@services'
import { formatTreeData } from './utils'

const option = {
  labelKey: 'name',
  valueKey: 'id',
  childrenKey: 'children'
}

class LawerTreeSelectModal extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
    submitMethod: PropTypes.func,
    unselectedTips: PropTypes.string,
    confrimContent: PropTypes.string,
    title: PropTypes.string,
    params: PropTypes.object,
    onSuccess: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      selectedKeys: [],
      confirmLoading: false,
      data: []
    }
    this.onSelect = this.onSelect.bind(this)
    this.onOk = this.onOk.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.visible && !nextProps.visible) {
      this.setState({ selectedKeys: [] })
    }
    if (!this.props.visible && nextProps.visible) {
      this.fetchTreeData()
    }
  }
  fetchTreeData () {
    departmentManageService.fetchDepartmentUserTree().then(({ data }) => {
      this.setState({
        data: formatTreeData(data)
      })
    })
  }
  onSelect (selectedKeys) {
    this.setState({ selectedKeys })
  }
  submit (selectedKey) {
    const { submitMethod, onCancel, params, onSuccess } = this.props
    this.setState({ confirmLoading: true })
    submitMethod({
      ...params,
      userId: selectedKey
    }).then(() => {
      onCancel()
      onSuccess()
    }).finally(() => this.setState({ confirmLoading: false }))
  }
  onOk () {
    const { selectedKeys, data } = this.state
    const { unselectedTips, confrimContent } = this.props
    if (selectedKeys.length === 0) return message.warning(unselectedTips)
    const selectedNode = findNodeInTree(data, { key: option.valueKey, value: selectedKeys[0] })
    Modal.confirm({
      title: '提示',
      content: `${confrimContent}【${selectedNode[option.labelKey]}】？`,
      onOk: () => this.submit(selectedKeys[0]) 
    })
  }
  render () {
    const { selectedKeys, confirmLoading, data } = this.state
    const { visible, onCancel, title } = this.props
    
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
        confirmLoading={confirmLoading}
        okText={confirmLoading ? '提交中...' : '确定'}>
        <Tree
          data={data}
          selectedKeys={selectedKeys}
          onSelect={this.onSelect}
          placeholder="请输入部门或姓名"
          option={option}
          isSearch />
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
  submitMethod: () => new Promise(resolve => setTimeout(() => resolve(), 1000)),
  params: {},
  onSuccess: () => {}
}

export default LawerTreeSelectModal