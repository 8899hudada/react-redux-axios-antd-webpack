import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

class InfoCard extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    isEdit: PropTypes.bool,
    allowDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    children: PropTypes.node,
    style: PropTypes.object
  }
  constructor (props) {
    super(props)
  }
  render () {
    const { title, isEdit, allowDelete, onDelete, onEdit, onCancel, onSave, children, style } = this.props
    const normalExtra = (
      <div className={styles['extra-wrap']}>
        { allowDelete && <a href="javascript:;" onClick={onDelete}>删除</a> }
        <a href="javascript:;" onClick={onEdit}>编辑</a>
      </div>
    )
    const editingExtra = (
      <div className={styles['extra-wrap']}>
        <a href="javascript:;" onClick={onCancel}>取消</a>
        <a href="javascript:;" onClick={onSave}>保存</a>
      </div>
    )
    return (
      <Card
        title={title}
        extra={isEdit ? editingExtra : normalExtra}
        style={{ marginTop: 10, ...style }}>
        { children }
      </Card>
    )
  }
}

InfoCard.defaultProps = {
  isEdit: false,
  allowDelete: true,
  onDelete: () => {},
  onEdit: () => {},
  onCancel: () => {},
  onSave: () => {},
  style: {}
}

export default InfoCard