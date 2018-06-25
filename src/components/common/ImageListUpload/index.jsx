import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message, Popconfirm } from 'antd'
import { Img } from '@components/common'
import { API_URL, API_ROOT } from '@constants'
import styles from './style'
import { deepCopy, getLocalStorage } from '@utils'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.min.css'

class ImageListUpload extends React.PureComponent {
  static propTypes = {
    beforeUpload: PropTypes.func,
    onChange: PropTypes.func,
    errMsg: PropTypes.string,
    imgList: PropTypes.array,
    maxCount: PropTypes.number,
    multiple: PropTypes.bool,
    allowDelete: PropTypes.bool,
    allowUpload: PropTypes.bool
  }
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidUpdate () {
    if (this.viewer) {
      this.viewer.update()
    } else {
      this.viewer = new Viewer(this.imgListBox)
    }
  }
  onChange (info) {
    const { file } = info
    const { status, response } = file
    const { errMsg, onChange, imgList, maxCount } = this.props
    switch (status) {
    case 'error':
      message.warning((response && response.msg) || errMsg)
      break
    case 'done':
      if (!response.ok) return message.warning((response && response.msg) || errMsg)
      if (imgList.length >= maxCount) return message.warning(`最多只能上传${maxCount}张`)
      onChange([...imgList, response.data.filePath])
      break
    }
    this.viewer.update()
  }
  handleDelete (index) {
    const { onChange, imgList } = this.props
    const tempImgList = deepCopy(imgList)
    tempImgList.splice(index, 1)
    onChange(tempImgList)
  }
  render () {
    const { beforeUpload, imgList, maxCount, multiple, allowDelete, allowUpload } = this.props
    return (
      <div>
        <ul
          className={styles['img-list-box']}
          style={{ display: imgList.length === 0 && 'none' }}
          ref={dom => this.imgListBox = dom}>
          {
            imgList.map((img, index) => (
              <li key={index}>
                <Img className="img" src={img} />
                <Popconfirm title="确认删除？" onConfirm={() => this.handleDelete(index)}>
                  <Icon
                    type="delete"
                    className={styles['del-btn']}
                    style={{ color: '#fa5151', fontSize: 20, display: !allowDelete && 'none' }} />
                </Popconfirm>
              </li>
            ))
          }
        </ul>
        { 
          <Upload
            accept="image/*"
            action={`${API_ROOT[process.env.ENV]}/${API_URL.common.UPLOAD}`}
            onChange={this.onChange}
            beforeUpload={beforeUpload}
            headers={{ 'X-Requested-With': null, token: getLocalStorage('token') }}
            showUploadList={false}
            multiple={multiple}
            style={{ display: (imgList.length >= maxCount || !allowUpload) && 'none' }}>
            <p className={styles['upload-box']}>
              <Icon type="plus" />
            </p>
          </Upload>
        }
      </div>
    )
  }
}

ImageListUpload.defaultProps = {
  beforeUpload: () => {},
  errMsg: '上传失败',
  maxCount: 8,
  multiple: true,
  allowDelete: false,
  allowUpload: true
}

export default ImageListUpload