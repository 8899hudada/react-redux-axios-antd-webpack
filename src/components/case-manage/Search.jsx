import React from 'react'
import { Form, Button, Input, Select, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import { trustorService, userManageService } from '@services'
import moment from 'moment'
import { CASE_PROCESSES, ASSIGN_STATUS } from '@constants'

const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker

class Search extends React.PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    searchParams: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired 
  }
  constructor (props) {
    super(props)
    this.state = {
      trustors: [{ id: -1, name: '全部' }],
      lawyers: [{ id: -1, name: '全部' }]
    }
  }
  componentDidMount () {
    this.fetchTrustors()
    this.fetchLawyers()
  }
  fetchTrustors () {
    trustorService.fetchList().then(({ data }) => {
      this.setState({
        trustors: [{ id: -1, name: '全部' }, ...data]
      })
    })
  }
  fetchLawyers () {
    userManageService.fetchUsers({
      current: 1,
      pageSize: 200
    }).then(({ data }) => {
      this.setState({
        lawyers: [{ id: -1, name: '全部' }, ...data.pageData]
      })
    })
  }
  render () {
    const { search, searchParams, onChange, reset } = this.props
    const { trustors, lawyers } = this.state
    const { customerName, trustorId, entrustDate, lawCaseCode, caseProcess, assignStatus, proxyLawyer } = searchParams
    return (
      <Form
        layout='inline'
        style={{ marginBottom: 10 }}>
        <FormItem label="委托方">
          <Select
            style={{ minWidth: 120 }}
            value={trustorId}
            onChange={value => onChange('trustorId', value)}
            placeholder="请选择委托方">
            {trustors.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
          </Select>
        </FormItem>
        <FormItem label="委案日期">
          <RangePicker
            value={entrustDate}
            onChange={value => onChange('entrustDate', value)}
            disabledDate={current => current && current > moment()} />
        </FormItem>
        <FormItem label="姓名">
          <Input
            value={customerName}
            onChange={event => onChange('customerName', event.target.value)}
            placeholder="请输入姓名" />
        </FormItem>
        <FormItem label="诉讼案号">
          <Input
            value={lawCaseCode}
            onChange={event => onChange('lawCaseCode', event.target.value)}
            placeholder="请输入诉讼案号" />
        </FormItem>
        <FormItem label="案件进程">
          <Select
            value={caseProcess}
            onChange={value => onChange('caseProcess', value)}
            placeholder="请选择案件进程">
            {CASE_PROCESSES.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
          </Select>
        </FormItem>
        <FormItem label="分配状态">
          <Select
            value={assignStatus}
            onChange={value => onChange('assignStatus', value)}
            placeholder="请选择分配状态">
            {ASSIGN_STATUS.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
          </Select>
        </FormItem>
        <FormItem label="律师">
          <Select
            style={{ minWidth: 120 }}
            value={proxyLawyer}
            onChange={value => onChange('proxyLawyer', value)}
            placeholder="请选择律师">
            {lawyers.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}
          </Select>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={search}>查询</Button>
        </FormItem>
        <FormItem>
          <Button
            onClick={reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Search