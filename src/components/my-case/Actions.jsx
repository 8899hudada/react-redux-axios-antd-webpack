import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'antd'

const FormItem = Form.Item

const Actions = props => {
  const onClick = props.onClick
  return (
    <div style={{ marginBottom: 10 }}>
      <Form layout="inline">
        <FormItem>
          <Button
            type="primary"
            onClick={() => onClick('caseCreate')}>新增案件</Button>
        </FormItem>
        <FormItem>
          <Button
            onClick={() => onClick('caseImport')}>导入案件</Button>
        </FormItem>
      </Form>
    </div>
  )
}

Actions.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Actions