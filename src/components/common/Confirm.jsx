import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const defaultOptions = {
  title: '删除',
  content: '确定要删除吗？'
}

const Confirm  = ({ children, options = {} }) => {
  return (
    <span onClick={() => Modal.confirm({...defaultOptions, ...options})}>
      {children}
    </span>
  )
}

Confirm.propTypes = {
  children: PropTypes.node,
  options: PropTypes.shape({
    cancelText: PropTypes.string, // 取消按钮文字
    className: PropTypes.string, // 容器类名
    content: PropTypes.string, // 内容
    iconType: PropTypes.string, // 图标 Icon 类型
    maskClosable: PropTypes.bool, // 击蒙层是否允许关闭
    okText: PropTypes.string, // 确认按钮文字
    okType: PropTypes.string, // 确认按钮类型
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // 标题
    width: PropTypes.string, // 宽度
    zIndex: PropTypes.number, // 设置 Modal 的 z-index
    onCancel: PropTypes.func, // 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭
    onOk: PropTypes.func // 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭
  })
}

export default Confirm