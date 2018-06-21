import React, { PureComponent } from 'react'
import style from '@styles/containers/login/loginBox.less'
import { Form, Input, Icon, Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginAction } from '@/redux/login'

const FormItem = Form.Item

class LoginForm extends PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    loginAction: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginAction(values)
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form 
    return (
      <Form
        hideRequiredMark>
        <FormItem>
          {
            getFieldDecorator('loginName', {
              rules: [{ required: true, message: '请输入用户名' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="请输入用户名" />
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }]
            })(
              <Input
                type='password'
                onPressEnter={this.handleSubmit}
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                placeholder="请输入密码" />
            )
          }
        </FormItem>
        <Button
          type="primary"
          onClick={this.handleSubmit}
          className={style.loginBoxButton}>登录</Button>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginAction: option => {
      dispatch(loginAction(option))
    }
  }
}

const mapStateToProps = () => {
  return {}
}

const WrappedLoginForm = Form.create()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
)

class LoginBox extends PureComponent {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className={style.loginBox}>
        <h1 className={style.loginBoxTitle}>登录</h1>
        <WrappedLoginForm />
      </div>
    )
  }
}

export default LoginBox