import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader, RemoteSelect, DraggerUpload } from '@components/common'
import { Card, Form, Button } from 'antd'
import styles from './style'
import { trustorService, commonService } from '@services'

const FormItem = Form.Item

class CaseImport extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    onBack: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit () {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          filePath: values.fileList[0].response.filePath,
          trustorId: values.trustorId
        }
        this.setState({ loading: true })
        commonService.caseImport(data).then(() => {
          this.props.onBack()
        }).finally(() => this.setState({ loading: false }))
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    return (
      <div>
        <PageHeader
          title="导入案件"
          extra={<a href="javascript:;">返回</a>} />
        <Card>
          <Form>
            <FormItem
              label="委托方">
              {
                getFieldDecorator('trustorId', {
                  initialValue:'',
                  getValueFromEvent: value => value,
                  rules: [{ required: true, message: '请选择委托方' }]
                })(
                  <RemoteSelect
                    remoteMethod={trustorService.fetchList}
                    placeholder="请选择委托方，可搜索" />
                )
              }
            </FormItem>
            <FormItem
              label={<span>案件上传（目前支持的文件类型为*.xls，*.xlsx）<a href="javascript:;">查看模板文件</a></span>}>
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
  onBack: () => {}
}

const WrappedCaseImport = Form.create()(CaseImport)

export default WrappedCaseImport