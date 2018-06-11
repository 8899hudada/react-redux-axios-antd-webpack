import React from 'react'
import PropTypes from 'prop-types'
import { InfoCard } from '@components/case-detail'
import { Form, Row, Col, Input, DatePicker, Select } from 'antd'
import { ACCOUNT_TYPES } from '@constants'
import { trustorService, caseDetailService } from '@services'
import moment from 'moment'
import { REGEX } from '@constants'

const FormItem = Form.Item
const Option = Select.Option

class EntrustInfo extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    params: PropTypes.object,
    fetchMethod: PropTypes.func,
    caseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false,
      trustors: []
    }
    this.onEdit = this.onEdit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  componentDidMount () {
    this.fetchTrustors()
  }
  fetchTrustors () {
    trustorService.fetchList().then(({ data }) => {
      this.setState({
        trustors: data
      })
    })
  }
  onEdit () {
    this.setState({ isEdit: true })
  }
  onCancel () {
    this.setState({ isEdit: false })
    this.props.form.resetFields()
  }
  onSave () {
    this.props.form.validateFields((err, values) => {
      if (err) return false
      caseDetailService.updateEntrustInfo(values).then(() => {
        this.props.fetchMethod()
        this.setState({ isEdit: false })
      })
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { isEdit, trustors } = this.state
    const { params } = this.props
    return (
      <InfoCard
        title="委案信息"
        allowDelete={false}
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}>
        <Form>
          <Row>
            <Col span={8}>
              <FormItem label="姓名" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('customName', {
                      initialValue: params.customName
                    })(
                      <Input
                        maxLength={16}
                        placeholder="请输入姓名" />
                    )
                    : <span>{params.customName}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="身份证" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('idCard', {
                      initialValue: params.idCard,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.idCardReg, message: '请输入正确的身份证' }]
                    })(
                      <Input
                        placeholder="请输入身份证" />
                    )
                    : <span>{params.idCard}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="委案金额" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('entrustAmt', {
                      initialValue: params.entrustAmt,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的委案金额' }]
                    })(
                      <Input
                        placeholder="请输入委案金额" />
                    )
                    : <span>{params.entrustAmt}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="本金余额" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('principalBalance', {
                      initialValue: params.principalBalance,
                      validateTrigger: 'onBlur',
                      rules: [{ pattern: REGEX.decimal2Reg, message: '请输入正确的本金余额' }]
                    })(
                      <Input
                        placeholder="请输入本金余额" />
                    )
                    : <span>{params.principalBalance}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label={isEdit
                  ? getFieldDecorator('accountType', {
                    initialValue: String(params.accountType)
                  })(<Select>
                    { Object.keys(ACCOUNT_TYPES).map(key => <Option key={key}>{ACCOUNT_TYPES[key]}</Option>) }
                  </Select>)
                  : ACCOUNT_TYPES[params.accountType] ? ACCOUNT_TYPES[params.accountType]: '账户'}
                style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('accountNumber', {
                      initialValue: params.accountNumber
                    })(
                      <Input
                        placeholder="请输入" />
                    )
                    : <span>{params.accountNumber}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="委托方" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('trustorId', {
                      initialValue: params.trustorId
                    })(
                      <Select
                        style={{ minWidth: 150 }}
                        optionFilterProp="children"
                        showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().includes(input.toLowerCase())}
                        placeholder="请选择委托方">
                        {trustors.map(trustor => <Option key={trustor.id}>{trustor.name}</Option>)}
                      </Select>
                    )
                    : <span>{params.trustorName}</span>
                }
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="委案日期" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('entrustDate', {
                      initialValue: moment(params.entrustDate)
                    })(
                      <DatePicker
                        placeholder="请选择委案日期" />
                    )
                    : <span>{params.entrustDate}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="产品名称" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('productName', {
                      initialValue: params.productName
                    })(
                      <Input
                        placeholder="请输入产品名称" />
                    )
                    : <span>{params.productName}</span>
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="代理律师" style={{ display: 'flex' }}>
                {
                  isEdit
                    ? getFieldDecorator('proxyLawyer', {
                      initialValue: params.proxyLawyer
                    })(
                      <Input
                        placeholder="请输入代理律师" />
                    )
                    : <span>{params.proxyLawyer}</span>
                }
              </FormItem>
            </Col>
          </Row>
        </Form>
      </InfoCard>
    )
  }
}

EntrustInfo.defaultProps = {
  fetchMethod: () => {}
}

const WrappedEntrustInfo = Form.create()(EntrustInfo)

export default WrappedEntrustInfo
