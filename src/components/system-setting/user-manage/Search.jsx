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
    }).isRequired,
    departments: PropTypes.array.isRequired,
    roles: PropTypes.array.isRequired,
    updateSearchParams: PropTypes.func.isRequired,
    fetchUsers: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)

    this.state = {
      userInputType: 'phone'
    }

    this.handleUserInputTypeChange = this.handleUserInputTypeChange.bind(this)
  }
  handleUserInputTypeChange (userInputType) {
    this.setState({userInputType})
    this.props.updateSearchParams({name: '', phone: ''})
  }
  render () {
    const { userInputType } = this.state
    const { searchParams, departments, roles, updateSearchParams, fetchUsers } = this.props

    const departmentOptions = departments.map(department => (
      <Option key={department.id} value={department.id}>{department.name}</Option>
    ))
    
    const roleOptions = roles.map(role => (
      <Option key={role.id} value={role.id}>{role.name}</Option>
    ))

    return (
      <Form layout='inline'>
        <FormItem label="员工查询">
          <Select
            style={{width: 150}}
            value={userInputType}
            onChange={value => this.handleUserInputTypeChange(value)}>
            <Option value="phone">员工电话</Option>
            <Option value="name">员工姓名</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input
            placeholder="请输入查询条件"
            value={searchParams[userInputType]}
            onChange={e => updateSearchParams({[userInputType]: e.target.value})}>
          </Input>
        </FormItem>
        <FormItem label="部门">
          <Select
            style={{width: 150}}
            value={searchParams.deptId}
            allowClear={true}
            dropdownMatchSelectWidth={false}
            onChange={value => updateSearchParams({deptId: value})}>
            <Option value={-1}>请选择</Option>
            {departmentOptions}
          </Select>
        </FormItem>
        <FormItem label="角色">
          <Select
            style={{width: 150}}
            value={searchParams.roleId}
            allowClear={true}
            dropdownMatchSelectWidth={false}
            onChange={value => updateSearchParams({roleId: value})}>
            <Option value={-1}>请选择</Option>
            {roleOptions}
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" onClick={fetchUsers}>搜索</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Search