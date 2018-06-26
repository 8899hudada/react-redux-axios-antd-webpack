import React from 'react'
import { PageHeader } from '@components/common'
import { Table, ErrModal } from '@components/task-manage'
import { Card, Alert, Icon, Button } from 'antd'
import { taskService } from '@services'
import { IMPORT_STATES } from '@constants'

const alertMessage = <div>
  <h3>说明</h3>
  <p>1）进行导入操作时系统会先检查数据的规范性，检查通过后开始进行数据导入；</p>
  <p>2）如果检查不通过数据将不会导入，可以按“不通过原因”的提示修改数据后重新导入，不通过原因将会保持 3 天。</p>
</div>

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
      loading: false,
      taskId: ''
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.viewErrs = this.viewErrs.bind(this)
    this.columns = [
      { title: '导入时间', dataIndex: 'createTime', key: 'createTime' },
      { title: '文件名', dataIndex: 'fileName', key: 'fileName' },
      { title: '导入状态', dataIndex: 'taskState', key: 'taskState', render: text => <span style={{ color: text === '2' ? '#ed3f14' : '#19be6b' }}>{IMPORT_STATES[text]}</span> },
      { title: '委托方', dataIndex: 'trustorName', key: 'trustorName' },
      { title: '操作人', dataIndex: 'createBy', key: 'createBy' },
      { title: '导入文件下载', dataIndex: 'filePath', key: 'filePath', align: 'center' ,
        render: text => <a href={text} target="_blank"><Icon type="download" style={{ fontSize: 20 }} /></a> },
      { title: '查看', dataIndex: 'view', key: 'view', 
        render: (text, record) => record.taskState === '2' && <Button type="danger" onClick={() => this.viewErrs(record.id)}>不通过原因</Button> }
    ]
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
  viewErrs (id) {
    this.setState({
      taskId: id
    }, () => {
      this.ErrModal.show()
    })
  }
  render () {
    const { data, pagination, loading, taskId } = this.state
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
            columns={this.columns}
            data={data}
            pagination={pagination}
            pageChange={this.handlePageChange} />
        </Card>
        <ErrModal
          taskId={taskId}
          ref={dom => this.ErrModal = dom} />
      </div>
    )
  }
}

export default TaskManage