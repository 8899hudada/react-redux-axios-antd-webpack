import React from 'react'
import { PageHeader } from '@components/common'
import { Table } from '@components/task-manage'
import { Card, Alert } from 'antd'
import { taskService } from '@services'

const alertMessage = <div>
  <h3>说明</h3>
  <p>1）进行导入操作时系统会先检查数据的规范性，检查通过后开始进行数据导入；</p>
  <p>2）如果检查不通过数据将不会导入，可以按“不通过原因”的提示修改数据后重新导入，不通过原因将会保持 3 天。</p>
</div>

const columns = [
  { title: '导入时间', dataIndex: 'createTime', key: 'createTime' },
  { title: '文件名', dataIndex: 'fileName', key: 'fileName' },
  { title: '导入状态', dataIndex: 'taskState', key: 'taskState' },
  { title: '委托方', dataIndex: 'trustorName', key: 'trustorName' },
  { title: '操作人', dataIndex: 'createBy', key: 'createBy' }
]

class TaskManage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  componentDidMount () {
    this.fetchList()
  }
  fetchList () {
    const { current, pageSize } = this.state.pagination
    this.setState({ loading: true })
    taskService.fetchList({
      current,
      pageSize
    }).then(({ data }) => {
      this.setState(prevState => ({
        data: data.pageData,
        pagination: {
          ...prevState.pagination,
          total: data.total
        }
      }))
    }).finally(() => this.setState({ loading: false }))
  }
  handlePageChange (current, pageSize) {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        current,
        pageSize
      }
    }), this.fetchList)
  }
  render () {
    const { data, pagination, loading } = this.state
    return (
      <div>
        <PageHeader title="任务管理" />
        <Card>
          <Alert
            type="warning"
            message={alertMessage}
            style={{ marginBottom: 10 }} />
          <Table
            loading={loading}
            columns={columns}
            data={data}
            pagination={pagination}
            pageChange={this.handlePageChange} />
        </Card>
      </div>
    )
  }
}

export default TaskManage