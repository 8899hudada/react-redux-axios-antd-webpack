import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'

const FormItem = Form.Item

const TableActions = props => {
  const onClick = props.onClick
  return (
    <Form layout="inline" style={{ backgroundColor: '#fcfcfc' }}>
      <FormItem style={{ marginLeft: 16 }}>
        <a
          href="javascript:;"
          onClick={() => onClick('caseTransfer')}>案件转交</a>
      </FormItem>
      <FormItem>
        <a
          href="javascript:;"
          onClick={() => onClick('caseExport')}>导出</a>
      </FormItem>
    </Form>
  )
}

TableActions.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default TableActions