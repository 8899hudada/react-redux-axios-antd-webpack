import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from '@components/common'
import { Card, Form, Button, Select, Input, DatePicker, Row, Col } from 'antd'
import { trustorService, caseManageService, userManageService } from '@services'
import { REGEX, ACCOUNT_TYPES } from '@constants'
import { TrustorModal } from '@components/system-setting/trustor-manage'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
class CaseCreate extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    onBack: PropTypes.func,
    isInMyCase: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      trustors: [],
      lawyers: [],
      trustorModalVisible: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hideTrustorModal = this.hideTrustorModal.bind(this)
    this.showTrustorModal = this.showTrustorModal.bind(this)
    this.fetchTrustors = this.fetchTrustors.bind(this)
  }
  componentDidMount () {
    this.fetchTrustors()
    this.fetchLawyers()
  }
  fetchTrustors () {
    trustorService.fetchList().then(({ data }) => {
      this.setState({
        trustors: data
      })
    })
  }
  fetchLawyers () {
    userManageService.fetchAllLawyers().then(({ data }) => {
      this.setState({
        lawyers: data
      })
    })
  }
  hideTrustorModal () {
    this.setState({ trustorModalVisible: false })
  }
  showTrustorModal () {
    this.setState({ trustorModalVisible: true })
  }
  handleSubmit () {
    const { form, onBack, isInMyCase } = this.props
    form.validateFields((err, values) => {
      if (err) return false
      const data = {
        ...values,
        entrustDate: values.entrustDate ? values.entrustDate.format('YYYY-MM-DD') : '',
        proxyLawyerId: values.proxyLawyerId ? values.proxyLawyerId : ''
      }
      if (isInMyCase) data.myCaseFlag = true
      this.setState({ loading: true })
      caseManageService.createCase(data).then(() => {
        onBack()
      }).finally(() => this.setState({ loading: false }))
    })
  }
  render () {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const { onBack, isInMyCase } = this.props
    const { loading, trustors, lawyers, trustorModalVisible } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 3,
        }
      }
    }
    return (
      <div>
        <PageHeader
          title="新增案件"
          extra={<a href="javascript:;" onClick={onBack}>返回</a>} />
        <Card>
          <Form>
            <FormItem
              label="姓名"
              {...formItemLayout}>
              {
                getFieldDecorator('customName', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '请输入姓名', whitespace: true }
                  ]
                })(
                  <Input
                    maxLength={16}
                    placeholder="请输入姓名" />
                )
              }
            </FormItem>
            <FormItem
              label="身份证号"
              {...formItemLayout}>
              {
                getFieldDecorator('idCard', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '请输入身份证号' },
                    { pattern: REGEX.idCardReg, message: '请输入正确的身份证号' }
                  ]
                })(
                  <Input placeholder="请输入身份证号" />
                )
              }
            </FormItem>
            <FormItem
              label="委案金额"
              {...formItemLayout}>
              {
                getFieldDecorator('entrustAmt', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { pattern: REGEX.decimal2Reg, message: '请输入正确的委案金额' }
                  ]
                })(
                  <Input placeholder="请输入委案金额" />
                )
              }
            </FormItem>
            <FormItem
              label="本金余额"
              {...formItemLayout}>
              {
                getFieldDecorator('principalBalance', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { pattern: REGEX.decimal2Reg, message: '请输入正确的本金余额' }
                  ]
                })(
                  <Input placeholder="请输入本金余额" />
                )
              }
            </FormItem>
            <FormItem
              label={getFieldDecorator('accountType', {
                initialValue: '0',
              })(
                <Select style={{ paddingRight: 10 }}>
                  {
                    Object.keys(ACCOUNT_TYPES).map(key => <Option key={key}>{ACCOUNT_TYPES[key]}</Option>)
                  }
                </Select>
              )}
              {...formItemLayout}>
              {
                getFieldDecorator('accountNumber', {
                  initialValue: '',
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: `请输入${ACCOUNT_TYPES[getFieldValue('accountType')]}`, whitespace: true }
                  ]
                })(
                  <Input maxLength={30} placeholder={`请输入${ACCOUNT_TYPES[getFieldValue('accountType')]}`} />
                )
              }
            </FormItem>
            <FormItem
              label="委托方"
              {...formItemLayout}>
              <Row gutter={8}>
                <Col span={20}>
                  {
                    getFieldDecorator('trustorId', {
                      rules: [
                        { required: true, message: '请选择委托方' }
                      ]
                    })(
                      <Select
                        optionFilterProp="children"
                        showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
                        placeholder="请选择委托方">
                        {trustors.map(trustor => <Option key={trustor.id}>{trustor.name}</Option>)}
                      </Select>
                    )
                  }
                </Col>
                <Col span={4}>
                  <Button
                    icon="plus"
                    onClick={this.showTrustorModal}></Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem
              label="委案日期"
              {...formItemLayout}>
              {
                getFieldDecorator('entrustDate')(
                  <DatePicker />
                )
              }
            </FormItem>
            <FormItem
              label="产品名称"
              {...formItemLayout}>
              {
                getFieldDecorator('productName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入产品名称" />
                )
              }
            </FormItem>
            {
              !isInMyCase && <FormItem
                label="律师"
                {...formItemLayout}>
                {
                  getFieldDecorator('proxyLawyerId')(
                    <Select
                      optionFilterProp="children"
                      showSearch
                      filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
                      placeholder="请选择律师">
                      {lawyers.map(lawyer => <Option key={lawyer.id}>{lawyer.name}</Option>)}
                    </Select>
                  )
                }
              </FormItem>
            }
            <FormItem {...tailFormItemLayout}>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                loading={loading}>{loading ? '正在保存' : '保存'}</Button>
            </FormItem>
          </Form>
        </Card>
        <TrustorModal
          type="create"
          visible={trustorModalVisible}
          hideModal={this.hideTrustorModal}
          fetchList={this.fetchTrustors} />
      </div>
    )
  }
}

CaseCreate.defaultProps = {
  onBack: () => {},
  isInMyCase: false
}

export default CaseCreate