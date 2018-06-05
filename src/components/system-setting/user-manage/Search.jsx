import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Input, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class Search extends React.PureComponent {
  static propTypes = {
    searchParams: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string,
      deptId: PropTypes.number,
      roleId: PropTypes.number
    })
  }
  constructor (props) {
    super(props)

    this.state = {
      userInputType: 'phone'
    }
  }
  render () {
    const { userInputType } = this.state
    const { searchParams } = this.props

    return (
      <Form layout='inline'>
        <FormItem label="员工查询">
          <Select value={userInputType}>
            <Option value="phone">员工电话</Option>
            <Option value="name">员工姓名</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input value={searchParams[userInputType]}></Input>
        </FormItem>
        <FormItem label="部门">
          <Select value={searchParams.deptId}>
            <Option value="phone">员工电话</Option>
            <Option value="name">员工姓名</Option>
          </Select>
        </FormItem>
        <FormItem label="角色">
          <Select value={searchParams.roleId}>
            <Option value="phone">员工电话</Option>
            <Option value="name">员工姓名</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary">搜索</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Search