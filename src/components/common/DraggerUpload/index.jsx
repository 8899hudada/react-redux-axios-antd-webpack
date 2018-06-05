import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message } from 'antd'
import { API_URL, API_ROOT } from '@constants'

const Dragger = Upload.Dragger

class DraggerUpload extends React.PureComponent {
  static propTypes = {
    accept: PropTypes.string,
    beforeUpload: PropTypes.func,
    onChange: PropTypes.func,
    errMsg: PropTypes.string,
    fileList: PropTypes.array,
    text: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  onChange (info) {
    const { file, fileList } = info
    const { status, response } = file
    const { errMsg, onChange } = this.props
    onChange(fileList)
    switch (status) {
    case 'error':
      onChange([])
      message.warning((response && response.msg) || errMsg)
      break
    case 'done':
      if (!response.ok) {
        onChange([])
        message.warning((response && response.msg) || errMsg)
      }
      break
    case 'removed':
      onChange([])
      break
    }
  }
  render () {
    const { accept, beforeUpload, fileList, text } = this.props
    return (
      <Dragger
        accept={accept}
        action={`${API_ROOT[process.env.ENV]}/${API_URL.common.UPLOAD}`}
        fileList={fileList}
        onChange={this.onChange}
        beforeUpload={beforeUpload}
        headers={{ 'X-Requested-With': null }}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">{text}</p>
      </Dragger>
    )
  }
}

DraggerUpload.defaultProps = {
  beforeUpload: () => {},
  errMsg: '上传失败',
  text: '点击上传或拖拽文件到此处'
}

export default DraggerUpload