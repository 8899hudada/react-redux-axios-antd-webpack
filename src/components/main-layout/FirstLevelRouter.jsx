import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from '@/routes'

const { Item: MenuItem } = Menu

const FirstLevelRouter = ( {activeRoute} ) => {
  const MenuItems = routes.map(route => {
    return (
      <MenuItem key={route.path}>
        <Link to={route.path}>{route.title}</Link>
      </MenuItem>
    )
  })

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[activeRoute && activeRoute.path]}>
      {MenuItems}
    </Menu>
  )
}

FirstLevelRouter.propTypes = {
  activeRoute: PropTypes.object
}

export default FirstLevelRouter