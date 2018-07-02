import React from 'react'
import { PageHeader, CaseImport, CaseCreate, LawerTreeSelectModal } from '@components/common'
import { Actions, Table, TableActions, Search } from '@components/my-case'
import { Card, message } from 'antd'
import { myCaseService, caseManageService } from '@services'
import { formatSearchParams, searchParamsFactory } from './utils'

const columns = [
  { title: '姓名', dataIndex: 'customName', key: 'customName', render: (text, record) => <a href={`/case-detail/${record.id}`} target="_blank">{text}</a> },
  { title: '身份证号', dataIndex: 'idCard', key: 'idCard' },
  { title: '委托方', dataIndex: 'trustorName', key: 'trustorName' },
  { title: '委案日期', dataIndex: 'entrustDate', key: 'entrustDate' },
  { title: '委案金额', dataIndex: 'entrustAmt', key: 'entrustAmt' },
  { title: '诉讼案号', dataIndex: 'lawCaseCode', key: 'lawCaseCode' },
  { title: '案件进程', dataIndex: 'caseProcess', key: 'caseProcess' }
]

class MyCase extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      selectedRowKeys: [],
      searchParams: searchParamsFactory(),
      data: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      loading: false,
      treeSelectVisible: false,
      curView: 'list'
    }
    this.actionClick = this.actionClick.bind(this)
    this.tableActionsClick = this.tableActionsClick.bind(this)
    this.search = this.search.bind(this)
    this.searchParamsChange = this.searchParamsChange.bind(this)
    this.resetSearchParams = this.resetSearchParams.bind(this)
    this.selectedRowKeysChange = this.selectedRowKeysChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.actionBack = this.actionBack.bind(this)
  }
  componentDidMount () {
    this.search()
  }
  actionClick (action) {
    switch (action) {
    case 'caseImport':
      this.setState({ curView: 'import' })
      break
    case 'caseCreate':
      this.setState({ curView: 'create' })
      break
    }
  }
  tableActionsClick (action) {
    const { selectedRowKeys, searchParams } = this.state
    switch (action) {
    case 'caseTransfer':
      if (selectedRowKeys.length === 0 ) return message.warning('请选择案件')
      this.setState({ treeSelectVisible: true })
      break
    case 'selectedExport':
      if (selectedRowKeys.length === 0 ) return message.warning('请选择案件')
      caseManageService.exportCase({
        caseIds: selectedRowKeys
      }).then(({ data }) => {
        window.open(data)
      })
      break
    case 'queryExport':
      caseManageService.exportCase(formatSearchParams(searchParams)).then(({ data }) => {
        window.open(data)
      })
      break
    }
  }
  search () {
    const { searchParams, pagination } = this.state
    const { current, pageSize } = pagination
    const data = formatSearchParams(searchParams)
    this.setState({ loading: true })
    myCaseService.fetchList({
      ...data,
      current,
      pageSize
    }).then(({ data }) => {
      this.setState(prevState => ({
        data: data.pageData,
        pagination: {
          ...prevState.pagination,
          total: data.total
        },
        selectedRowKeys: []
      }))
    }).finally(() => this.setState({ loading: false }))
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
    }), this.search)
  }
  actionBack () {
    this.setState({ curView: 'list' }, this.search)
  }
  render () {
    const { selectedRowKeys, searchParams, pagination, loading, treeSelectVisible, curView, data } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.selectedRowKeysChange
    }
    if (curView === 'import') {
      return <CaseImport onBack={this.actionBack} />
    } else if (curView === 'create') {
      return <CaseCreate onBack={this.actionBack} isInMyCase={true} />
    }
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
          onCancel={() => this.setState({ treeSelectVisible: false })}
          onSuccess={this.search}
          title="案件转交"
          unselectedTips="请选择转交对象"
          confrimContent="确定将案件转交给"
          params={{ caseIds: selectedRowKeys }}
          submitMethod={caseManageService.assignCase} />
      </div>
    )
  }
}

export default MyCase