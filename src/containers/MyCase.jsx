import React from 'react'
import { PageHeader, CaseImport } from '@components/common'
import { Actions, Table, TableActions, Search, LawerTreeSelectModal } from '@components/my-case'
import { Card, message } from 'antd'

const data = [
  { id: 1, name: '哈哈' }
]
const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' }
]

const searchParamsFactory = () => ({
  name: ''
})

class MyCase extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      searchParams: searchParamsFactory(),
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      loading: false,
      treeSelectVisible: false,
      isImport: false
    }
    this.actionClick = this.actionClick.bind(this)
    this.tableActionsClick = this.tableActionsClick.bind(this)
    this.search = this.search.bind(this)
    this.searchParamsChange = this.searchParamsChange.bind(this)
    this.resetSearchParams = this.resetSearchParams.bind(this)
    this.selectedRowKeysChange = this.selectedRowKeysChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.caseImportBack = this.caseImportBack.bind(this)
  }
  actionClick (action) {
    switch (action) {
    case 'caseImport':
      this.setState({ isImport: true })
      break
    }
  }
  tableActionsClick (action) {
    switch (action) {
    case 'caseTransfer':
      if (this.state.selectedRowKeys.length === 0 ) return message.warning('请选择案件')
      this.setState({ treeSelectVisible: true })
      break
    }
  }
  search () {
    console.log(this.state.searchParams)
  }
  resetSearchParams () {
    this.setState({
      searchParams: searchParamsFactory()
    }, this.search)
  }
  searchParamsChange (key, value) {
    this.setState(prevState => ({
      searchParams: {
        ...prevState.searchParams,
        [key]: value
      }
    }))
  }
  selectedRowKeysChange (selectedRowKeys) {
    this.setState({ selectedRowKeys })
  }
  handlePageChange (current, pageSize) {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        current,
        pageSize
      }
    }))
  }
  caseImportBack () {
    this.setState({ isImport: false })
  }
  render () {
    const { selectedRowKeys, searchParams, pagination, loading, treeSelectVisible, isImport } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.selectedRowKeysChange
    }
    if (isImport) return <CaseImport onBack={this.caseImportBack} />
    return (
      <div>
        <PageHeader title="我的案件" />
        <Card>
          <Actions onClick={this.actionClick} />
          <Search
            searchParams={searchParams}
            reset={this.resetSearchParams}
            onChange={this.searchParamsChange}
            search={this.search} />
          <TableActions onClick={this.tableActionsClick} />
          <Table
            loading={loading}
            data={data}
            columns={columns}
            rowSelection={rowSelection}
            pagination={pagination}
            pageChange={this.handlePageChange} />
        </Card>
        <LawerTreeSelectModal
          visible={treeSelectVisible}
          onCancel={() => this.setState({ treeSelectVisible: false })} />
      </div>
    )
  }
}

export default MyCase