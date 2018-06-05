import React from 'react'
import PropTypes from 'prop-types'
import { Card, Form, Input, Button } from 'antd'
import { PageHeader } from '@components/common'
import { REGEX } from '@constants'
import { passwordSettingService } from '@services'

const FormItem = Form.Item
const formItemLayout = {}

class PasswordSetting extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object
  }
  constructor (props) {
    super(props)

    this.confirmPasswordValidator = this.confirmPasswordValidator.bind(this)    
    this.handleSubmit = this.handleSubmit.bind(this)    
  }
  confirmPasswordValidator (rule, value, callback) {
    const form = this.props.form

    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致')
    } else {
      callback()
    }
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return false
      }

      passwordSettingService.updatePassword(values).then(res => {
        console.log(res)
      })
    })
  }
  render () {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div>
        <PageHeader title="密码设置" />
        <Card>
          <Form style={{width: 600}} onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="原密码">
              {getFieldDecorator('oldPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入原始密码',
                  }
                ],
              })(
                <Input type="password" placeholder="请输入原密码" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="新密码">
              {getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    pattern: REGEX.password,
                    message: '请输入6-16个字符，前后不能有空格，区分大小写·可以是字母/数字/或特殊字符-=+_等',
                  }
                ],
              })(
                <Input type="password" placeholder="请输入6-16个字符，前后不能有空格，区分大小写·可以是字母/数字/或特殊字符-=+_等" />
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="确认密码">
              {getFieldDecorator('confirmPassword', {
                rules: [
                  {
                    required: true,
                    message: '请再次输入新密码',
                  },
                  {
                    validator: this.confirmPasswordValidator
                  }
                ],
              })(
                <Input type="password" placeholder="请再次输入新密码" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
          </Form> 
        </Card>
      </div>
    )
  }
}

export default Form.create()(PasswordSetting)