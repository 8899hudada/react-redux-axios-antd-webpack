import React from 'react'
import { Table } from 'antd'
import PropTypes from 'prop-types'

class localTable extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pagination: PropTypes.shape({
      current: PropTypes.number,
      total: PropTypes.number,
      pageSize: PropTypes.number,
    }),
    pageChange: PropTypes.func,
    loading: PropTypes.bool,
    rowSelection: PropTypes.object
  }
  render () {
    const { loading, data, columns, pagination, pageChange, rowSelection } = this.props
    return (
      <div>
        <Table
          loading={loading}
          rowKey='id'
          size='middle'
          pagination={{
            ...pagination,
            showSizeChanger: true,
            onChange: pageChange,
            onShowSizeChange: pageChange,
            showTotal: total => `共 ${total} 条记录`
          }}
          dataSource={data}
          columns={columns}
          rowSelection={rowSelection} />
      </div>
    )
  }
}

export default localTable