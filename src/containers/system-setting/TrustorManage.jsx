import React from 'react'
import { Button, Card } from 'antd'
import { Table, TrustorModal } from '@components/system-setting/trustor-manage'
import { PageHeader } from '@components/common'
import { trustorService } from '@services'

class TrustorManage extends React.PureComponent {
  constructor (props) {
    super(props)
    
    this.state = {
      trustors: [], // 委托方列表
      trustorModalVisible: false, // 显示委托方弹窗
      trustorModalType: 'update', // 委托方弹窗类型 ['update', 'create']
      editTrustorIndex: 0, // 编辑的委托方索引号,
      loading: false
    }

    this.fetchList = this.fetchList.bind(this)
    this.toggleTrustorModal = this.toggleTrustorModal.bind(this)
  }
  fetchList () {
    this.setState({ loading: true })
    trustorService.fetchList().then(res => {
      this.setState({trustors: res.data})
    }).finally(() => this.setState({ loading: false }))
  }
  toggleTrustorModal (visible, type, editTrustorIndex) {
    const nextTrustorModalState = {trustorModalVisible: visible}
    
    if (visible) {
      nextTrustorModalState.trustorModalType = type
    }

    if (type === 'update') {
      nextTrustorModalState.editTrustorIndex = editTrustorIndex
    }

    this.setState(nextTrustorModalState)
  }
  render () {
    const { trustorModalType, trustorModalVisible, editTrustorIndex, trustors, loading } = this.state
    
    return (
      <div>
        <PageHeader title="委托方管理" />
        <Card>
          <Button type="primary" onClick={() => this.toggleTrustorModal(true, 'create')}>添加委托方</Button>
          <div className="margin-top-xs">
            <Table
              loading={loading}
              trustors={trustors}
              fetchList={this.fetchList}
              toggleTrustorModal={this.toggleTrustorModal}>
            </Table>
          </div>
        </Card>
        <TrustorModal
          type={trustorModalType}
          visible={trustorModalVisible}
          hideModal={() => this.toggleTrustorModal(false)}
          fetchList={this.fetchList}
          trustor={trustors[editTrustorIndex]}>
        </TrustorModal>
      </div>
    )
  }
  componentDidMount () {
    this.fetchList()
  }
}

export default TrustorManage