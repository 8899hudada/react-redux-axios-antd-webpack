import React from 'react'
import { Button, Card } from 'antd'
import { Table, TrustorModal } from '@components/system-setting/trustor-manage'
import { PageHeader } from '@components/common'
import { trustorService } from '@services'
import config from '@config'

class TrustorManage extends React.PureComponent {
  constructor (props) {
    super(props)
    
    this.state = {
      trustors: [], // 委托方列表
      trustorModalVisible: false, // 显示委托方弹窗
      trustorModalType: 'update', // 委托方弹窗类型 ['update', 'create']
      editTrustor: null, // 编辑的委托方,
      loading: false,
      pagination: {
        ...config.pagination,
        onChange: current => this.updatePagination({current}),
        onShowSizeChange: (current, pageSize) => this.updatePagination({current, pageSize}) 
      }
    }

    this.fetchList = this.fetchList.bind(this)
    this.toggleTrustorModal = this.toggleTrustorModal.bind(this)
    this.updatePagination = this.updatePagination.bind(this)
  }
  fetchList () {
    this.setState({ loading: true })
    trustorService.fetchList().then(res => {
      this.setState({trustors: res.data})
    }).finally(() => this.setState({ loading: false }))
  }
  toggleTrustorModal (visible, type, editTrustor) {
    const nextTrustorModalState = {trustorModalVisible: visible}
    
    if (visible) {
      nextTrustorModalState.trustorModalType = type
    }

    if (type === 'update') {
      nextTrustorModalState.editTrustor = editTrustor
    }

    this.setState(nextTrustorModalState)
  }
  updatePagination (pagination = {}) {
    this.setState({pagination: {
      ...this.state.pagination,
      ...pagination
    }}) 
  }
  render () {
    const { trustorModalType, trustorModalVisible, editTrustor, trustors, loading, pagination } = this.state
    
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
              toggleTrustorModal={this.toggleTrustorModal}
              pagination={pagination}>
            </Table>
          </div>
        </Card>
        <TrustorModal
          type={trustorModalType}
          visible={trustorModalVisible}
          hideModal={() => this.toggleTrustorModal(false)}
          fetchList={this.fetchList}
          trustor={editTrustor}>
        </TrustorModal>
      </div>
    )
  }
  componentDidMount () {
    this.fetchList()
  }
}

export default TrustorManage