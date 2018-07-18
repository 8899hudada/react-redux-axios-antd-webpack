import React from 'react'
import PropTypes from 'prop-types'
import { Form, Dropdown, Icon, Menu } from 'antd'

const FormItem = Form.Item
const MenuItem = Menu.Item

const TableActions = props => {
  const onClick = props.onClick
  const menu = (
    <Menu>
      <MenuItem>
        <a
          href="javascript:;"
          onClick={() => onClick('selectedExport')}>选择导出</a>
      </MenuItem>
      <MenuItem>
        <a
          href="javascript:;"
          onClick={() => onClick('queryExport')}>查询结果导出</a>
      </MenuItem>
    </Menu>
  )
  return (
    <Form layout="inline" className="bg-table-action">
      <FormItem style={{ marginLeft: 16 }}>
        <a
          href="javascript:;"
          onClick={() => onClick('caseTransfer')}>案件转交</a>
      </FormItem>
      <FormItem>
        <Dropdown overlay={menu}>
          <a href="javascript:;">导出 <Icon type="down" /></a>
        </Dropdown>
      </FormItem>
    </Form>
  )
}

TableActions.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default TableActions