import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

const AntdTextArea = Input.TextArea

class TextArea extends React.PureComponent {
  static propTypes = {
    maxLength: PropTypes.number
  }
  constructor () {
    super()
    this.state = {
      count: 0
    }
  }
  componentDidUpdate () {
    this.updateCount()
  }
  componentDidMount () {
    this.updateCount()
  }
  updateCount () {
    this.setState({ count: this.textArea.props.value.length })
  }
  render () {
    const { maxLength } = this.props
    const { count } = this.state
    return (
      <div className={styles['text-area-wrap']}>
        <AntdTextArea
          style={ maxLength && { paddingBottom: 20 } }
          ref={el => this.textArea = el}
          {...this.props} />
        { maxLength && <span className={styles['text-area-word-count']}>{count}/{maxLength}</span> }
      </div>
    )
  }
}

export default TextArea