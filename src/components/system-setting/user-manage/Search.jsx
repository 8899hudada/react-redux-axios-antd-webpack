import React from 'react'
import { Form, Select, Input } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

const Search = () => {
  return (
    <Form layout='inline'>
      <FormItem label="员工查询">
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Input></Input>
      </FormItem>
    </Form>
  )
}

export default Search