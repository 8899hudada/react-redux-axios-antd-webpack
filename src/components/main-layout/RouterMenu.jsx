import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import routes from '@/routes'

const { Item: MenuItem, SubMenu } = Menu
const routeRecursion = route => {
  if (route.children && route.children.length) {
    return (
      <SubMenu key={route.path} title={<span>{route.title}</span>}>
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

const SecondLevelRouter = () => {
  const MenuItems = routes.map(route => {
    return routeRecursion(route)
  })

  return (
    <Menu
      theme="dark"
      className="sider-menu"
      mode="inline"
      selectedKeys={[window.$history && window.$history.location.pathname]}>
      {MenuItems}
    </Menu>
  )
}

export default SecondLevelRouter