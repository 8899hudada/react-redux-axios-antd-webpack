import React from 'react'
import { Form, Button, Input } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

class Search extends React.PureComponent {
  static propTypes = {
    search: PropTypes.func.isRequired,
    searchParams: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired 
  }
  render () {
    const { search, searchParams, onChange, reset } = this.props
    const { name} = searchParams
    return (
      <Form
        layout='inline'
        style={{ marginBottom: 10 }}>
        <FormItem label="姓名">
          <Input
            value={name}
            onChange={event => onChange('name', event.target.value)}
            placeholder="请输入姓名" />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={search}>查询</Button>
        </FormItem>
        <FormItem>
          <Button
            onClick={reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Search