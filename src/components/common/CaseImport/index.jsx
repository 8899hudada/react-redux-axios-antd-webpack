import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader, DraggerUpload } from '@components/common'
import { Card, Form, Button, Select } from 'antd'
import styles from './style'
import { trustorService, commonService } from '@services'
import { API_ROOT } from '@constants'

const FormItem = Form.Item
const Option = Select.Option
const TEMPLATE_URL = `${API_ROOT[process.env.ENV]}/template/case/律师案件导入模板.xlsx`

@Form.create()
class CaseImport extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    onBack: PropTypes.func,
    isInMyCase: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      trustors: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
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
  handleSubmit () {
    const { form, isInMyCase } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        const data = {
          filePath: values.fileList[0].response.data.filePath,
          trustorId: values.trustorId
        }
        if (isInMyCase) data.myCaseFlag = true
        this.setState({ loading: true })
        commonService.caseImport(data).then(() => {
          window.$history.push('/task-manage')
        }).finally(() => this.setState({ loading: false }))
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { onBack } = this.props
    const { loading, trustors } = this.state
    return (
      <div>
        <PageHeader
          title="导入案件"
          extra={<a href="javascript:;" onClick={onBack}>返回</a>} />
        <Card>
          <Form>
            <FormItem
              label="委托方">
              {
                getFieldDecorator('trustorId', {
                  rules: [{ required: true, message: '请选择委托方' }]
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
            </FormItem>
            <FormItem
              label={<span>案件上传（目前支持的文件类型为*.xls，*.xlsx）<a href={TEMPLATE_URL} target="_blank">查看模板文件</a></span>}>
              {
                getFieldDecorator('fileList', {
                  valuePropName: 'fileList',
                  initialValue: [],
                  getValueFromEvent: value => value,
                  rules: [{ required: true, message: '请上传案件' }]
                })(
                  <DraggerUpload
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                )
              }
            </FormItem>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              className={styles['submit-btn']}
              loading={loading}>{loading ? '正在导入' : '开始导入'}</Button>
          </Form>
        </Card>
      </div>
    )
  }
}

CaseImport.defaultProps = {
  onBack: () => {},
  isInMyCase: false
}

export default CaseImport