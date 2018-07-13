import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Table } from 'antd'
import { columnNumberToLetter } from '@utils'
import { taskService } from '@services'

const columns = [
  { title: '所在行', dataIndex: 'rowNum', key: 'rowNum', width: 120 },
  { title: '原因', dataIndex: 'reason', key: 'reason',
    render: (text, record) => {
      let errorArr = []
      if (record.cellErrors) errorArr = record.cellErrors.map(item => `${item.cellTitle}（第${columnNumberToLetter(item.columnIndex + 1)}列）：${item.error}`)
      if (record.error) errorArr.unshift(record.error)
      return (
        <div>{ errorArr.join('；') }</div>
      )
    }
  }
]

class ErrModal extends React.PureComponent {
  static propTypes = {
    taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      data: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      expire: false
    }
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this.pageChange = this.pageChange.bind(this)
  }
  show () {
    this.setState({
      visible: true
    }, this.fetchList)
  }
  hide () {
    this.setState({ 
      visible: false,
      data: []
    })
  }
  fetchList () {
    const { taskId } = this.props
    const { pagination: { current, pageSize } } = this.state
    this.setState({ loading: true })
    taskService.fetchTaskErrs({ taskId, current, pageSize }).then(({ data }) => {
      this.setState(prevState => ({
        data: data.pageData,
        pagination: {
          ...prevState.pagination,
          total: data.total
        },
        expire: data.pageData.length === 0
      }))
    }).finally(() => this.setState({ loading: false }))
  }
  pageChange (current, pageSize) {
    this.setState(prevState => ({
      pagination: {
        ...prevState.pagination,
        current,
        pageSize
      }
    }), this.fetchList)
  }
  render () {
    const { visible, data, pagination, loading, expire } = this.state
    return (
      <Modal
        title="不规范数据列表"
        width={1000}
        visible={visible}
        onCancel={this.hide}
        footer={null}>
        <Table
          loading={loading}
          rowKey='id'
          size='middle'
          pagination={{
            ...pagination,
            showSizeChanger: true,
            onChange: this.pageChange,
            onShowSizeChange: this.pageChange,
            showTotal: total => `共 ${total} 条记录`
          }}
          dataSource={data}
          columns={columns}
          scroll={{ y: 300 }}
          locale={{ emptyText: expire ? '数据已过期' : '' }} />
      </Modal>
    )
  }
}

export default ErrModal