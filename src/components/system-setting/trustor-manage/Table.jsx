import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import { TableIndex, Confirm } from '@components/common'
import { trustorService } from '@services'

const TrustorTable = ({ trustors = [], fetchList, toggleTrustorModal }) => {
  const deleteTrustor = (id) => {
    trustorService.deleteTrustor(id).then(() => fetchList())
  }
  const columns = [
    {
      title: '序号',
      render: TableIndex,
      key: 'index'
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '操作',
      render: (text, record, index) => {
        return (
          <div>
            <Button
              type="primary"
              className="margin-right-xs"
              onClick={() => {toggleTrustorModal(true, 'update', index)}}>
              编辑
            </Button>
            <Confirm options={{onOk: () => deleteTrustor(record.id)}}>
              <Button type="danger">删除</Button>
            </Confirm>
          </div>
        )
      },
      key: 'operation'
    }
  ]

  return (
    <Table
      columns={columns}
      dataSource={trustors}
      rowKey='id'>
    </Table>
  )
}

TrustorTable.propTypes = {
  trustors: PropTypes.array,
  fetchList: PropTypes.func.isRequired,
  toggleTrustorModal: PropTypes.func.isRequired
}

export default TrustorTable