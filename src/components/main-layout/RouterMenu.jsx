import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import router from '@/router'
import PropTypes from 'prop-types'

const { Item: MenuItem, SubMenu } = Menu

const routeRecursion = route => {
  if (route.children && route.children.length) {
    return (
      <SubMenu key={route.path} title={route.title} onTitleClick={handleOpenChange}>
        {
          route.children.map(route => (
            routeRecursion(route)
          ))
        }
      </SubMenu>
    )
  }

  return (
    <MenuItem key={route.path}>
      <Link key={route.path} to={route.path}>{route.title}</Link>
    </MenuItem>
  )
}

const handleOpenChange = key => {
  console.log(key)
}

const RouterMenu = ({ openKeys = [], selectedKeys = [] }) => {
  const MenuItems = router.children.map(route => {
    return routeRecursion(route)
  })

  return (
    <Menu
      theme="dark"
      className="sider-menu"
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}>
      {MenuItems}
    </Menu>
  )
}

RouterMenu.propTypes = {
  selectedKeys: PropTypes.array.isRequired,
  openKeys: PropTypes.array.isRequired
}

export default RouterMenu