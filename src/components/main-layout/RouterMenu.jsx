import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import routes from '@/routes'
// import { traversalTree } from '@utils'

const { Item: MenuItem, SubMenu } = Menu

// const openKeysFactory = (pathname, routes) => {
//   traversalTree(routes, node => {
    
//   })
// }

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

const RouterMenu = () => {
  const MenuItems = routes.map(route => {
    return routeRecursion(route)
  })

  return (
    <Menu
      theme="dark"
      className="sider-menu"
      mode="inline"
      openKeys={['/system-setting', '/system-setting/user-manage']}
      selectedKeys={[window.$history && window.$history.location.pathname]}>
      {MenuItems}
    </Menu>
  )
}

export default RouterMenu