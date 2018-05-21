import React from 'react'
import { Menu, Dropdown, Icon } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutAction } from '@/redux/login'

const { Item: MenuItem } = Menu

const DropdownMenu = (onClickMenu) => {
  return (
    <Menu onClick={onClickMenu}>
      <MenuItem key="changePassword">
        <Icon type="edit" />
        <span className="margin-left-xs">修改密码</span>
      </MenuItem>
      <MenuItem key="logout">
        <Icon type="logout" />
        <span className="margin-left-xs">退出登录</span>
      </MenuItem>
    </Menu>
  )
}

const User = props => {
  function handleClickMenu ({ key }) {
    switch (key) {
    case 'logout':
      props.logoutAction()
      break
    }
  }

  return (
    <Dropdown
      overlay={DropdownMenu(handleClickMenu)}
      placement="bottomRight"
      trigger={['click']}>
      <div className="user-box">
        <span>张三</span>
        <Icon className="drop-down-icon" type="down" />
      </div>
    </Dropdown>
  )
}

User.propTypes = {
  logoutAction: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    logoutAction: () => {
      dispatch(logoutAction())
    }
  }
}

const mapStateToProps = () => {
  return {}
}

const WrappedUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

export default WrappedUser