import React from 'react'
import { Card } from 'antd'
import PropTypes from 'prop-types'
import style from './style'

class InfoCard extends React.PureComponent {
  static propTypes = {
    title: PropTypes.oneOf([PropTypes.string, PropTypes.node]).isRequired,
    isEdit: PropTypes.bool,
    allowDelete: PropTypes.bool,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    children: PropTypes.node
  }
  constructor (props) {
    super(props)
  }
  render () {
    const { title, isEdit, allowDelete, onDelete, onEdit, onCancel, onSave, children } = this.props
    const normalExtra = (
      <div className={style['extra-wrap']}>
        { allowDelete && <a href="javascript:;" onClick={onDelete}>删除</a> }
        <a href="javascript:;" onClick={onEdit}>编辑</a>
      </div>
    )
    const editingExtra = (
      <div className={style['extra-wrap']}>
        <a href="javascript:;" onClick={onCancel}>取消</a>
        <a href="javascript:;" onClick={onSave}>保存</a>
      </div>
    )
    return (
      <Card
        title={title}
        extra={isEdit ? editingExtra : normalExtra}
        style={{ marginTop: 10 }}>
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
  onSave: () => {}
}

export default InfoCard