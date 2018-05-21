import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const { Item: MenuItem, ItemGroup: MenuItemGroup } = Menu
const routeRecursion = route => {
  if (route.children && route.children.length) {
    return (
      <MenuItemGroup key={route.path} title={<span>{route.title}</span>}>
        {
          route.children.map(route => (
            routeRecursion(route)
          ))
        }
      </MenuItemGroup>
    )
  }

  return (
    <MenuItem key={route.path}>
      <Link key={route.path} to={route.path}>{route.title}</Link>
    </MenuItem>
  )
}

const SecondLevelRouter = ({ activeFirstLevelRoute }) => {
  let routes = []
  
  if (activeFirstLevelRoute) {
    const children = activeFirstLevelRoute.children

    if (children && children.length) {
      routes = children
    } else {
      routes = [activeFirstLevelRoute]
    }
  }

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

SecondLevelRouter.propTypes = {
  activeFirstLevelRoute: PropTypes.object
}

export default SecondLevelRouter