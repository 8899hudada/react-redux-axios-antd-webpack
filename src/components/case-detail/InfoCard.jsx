import React from 'react'
import { Card, Modal } from 'antd'
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
    style: PropTypes.object,
    id: PropTypes.string
  }
  constructor (props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete () {
    Modal.confirm({
      title: '提示',
      content: '确认删除？',
      onOk: () => this.props.onDelete()
    })
  }
  render () {
    const { title, isEdit, allowDelete, onEdit, onCancel, onSave, children, style, id } = this.props
    const normalExtra = (
      <div className={styles['extra-wrap']}>
        { allowDelete && <a href="javascript:;" onClick={this.handleDelete}>删除</a> }
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
        title={<div id={id}>{title}</div>}
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