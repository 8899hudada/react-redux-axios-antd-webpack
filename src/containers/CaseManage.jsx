import React from 'react'
import { PageHeader, CaseImport, CaseCreate, LawerTreeSelectModal } from '@components/common'
import { Actions, Table, TableActions, Search } from '@components/case-manage'
import { Card, message } from 'antd'
import { caseManageService } from '@services'

const columns = [
  { title: '姓名', dataIndex: 'customName', key: 'customName', render: (text, record) => <a href={`/case-detail/${record.id}`} target="_blank">{text}</a> },
  { title: '身份证号', dataIndex: 'idCard', key: 'idCard' },
  { title: '委托方', dataIndex: 'trustorName', key: 'trustorName' },
  { title: '委案日期', dataIndex: 'entrustDate', key: 'entrustDate' },
  { title: '委案金额', dataIndex: 'entrustAmt', key: 'entrustAmt' },
  { title: '诉讼案号', dataIndex: 'lawCaseCode', key: 'lawCaseCode' },
  { title: '分配状态', dataIndex: 'assignStatus', key: 'assignStatus', render: text => <div>{ text ? '已分配' : '未分配' }</div> },
  { title: '代理律师', dataIndex: 'proxyLawyer', key: 'proxyLawyer' },
  { title: '案件进程', dataIndex: 'caseProcess', key: 'caseProcess' }
]

const searchParamsFactory = () => ({
  customerName: '',
  entrustDate: [],
  createTime: [],
  trustorId: -1,
  lawCaseCode: '',
  caseProcess: -1,
  caseStatus: -1,
  proxyLawyer: -1
})

class CaseManage extends React.PureComponent {
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
    switch (action) {
    case 'caseDistribution':
      if (this.state.selectedRowKeys.length === 0 ) return message.warning('请选择案件')
      this.setState({ treeSelectVisible: true })
      break
    case 'selectedExport':
      if (this.state.selectedRowKeys.length === 0 ) return message.warning('请选择案件')
      break
    case 'queryExport':
      break
    }
  }
  search () {
    const { searchParams } = this.state
    const data = {
      ...searchParams,
      trustorId: searchParams.trustorId === -1 ? '' : searchParams.trustorId,
      caseStatus: searchParams.caseStatus === -1 ? '' : searchParams.caseStatus,
      assignStatus: searchParams.assignStatus === -1 ? '' : Boolean(searchParams.assignStatus),
      proxyLawyer: searchParams.proxyLawyer === -1 ? '' : searchParams.proxyLawyer,
      entrustDateBegin: searchParams.entrustDate.length ? searchParams.entrustDate[0].format('YYYY-MM-DD'): '',
      entrustDateEnd: searchParams.entrustDate.length ? searchParams.entrustDate[1].format('YYYY-MM-DD'): '',
      createTimeBegin: searchParams.createTime.length ? searchParams.createTime[0].format('YYYY-MM-DD'): '',
      createTimeEnd: searchParams.createTime.length ? searchParams.createTime[1].format('YYYY-MM-DD'): ''
    }
    console.log(data)
    this.setState({ loading: true })
    caseManageService.fetchList(data).then(({ data }) => {
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
      return <CaseCreate onBack={this.actionBack} />
    }
    return (
      <div>
        <PageHeader title="案件管理" />
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
          title="案件分配"
          unselectedTips="请选择分配对象"
          confrimContent="确定将案件分配给" />
      </div>
    )
  }
}

export default CaseManage