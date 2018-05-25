import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import router from '@/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateRouterMenuAction } from '@redux/common'

const { Item: MenuItem, SubMenu } = Menu

class RouterMenu extends React.PureComponent {
  constructor (props) {
    super(props)

    this.routeRecursion = this.routeRecursion.bind(this)
    this.handleOpenChange = this.handleOpenChange.bind(this)
  }
  static propTypes = {
    selectedKeys: PropTypes.array.isRequired,
    openKeys: PropTypes.array.isRequired,
    updateRouterMenuAction: PropTypes.func.isRequired
  }
  handleOpenChange ({ key }) {
    const { openKeys, updateRouterMenuAction } = this.props
    const nextOpenKeys = [...openKeys]

    if (openKeys.includes(key)) {
      nextOpenKeys.splice(nextOpenKeys.findIndex(openKey => openKey === key), 1)
    }  else {
      nextOpenKeys.push(key)
    }

    updateRouterMenuAction({openKeys: nextOpenKeys})
  }
  routeRecursion (route) {
    if (route.children && route.children.length) {
      return (
        <SubMenu key={route.path} title={route.title} onTitleClick={this.handleOpenChange}>
          {
            route.children.map(route => (
              this.routeRecursion(route)
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
  render () {
    const { openKeys, selectedKeys } = this.props
    const MenuItems = router.children.map(route => {
      return this.routeRecursion(route)
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
}

const mapStateToProps = state => ({
  openKeys: state.commonReducer.openKeys,
  selectedKeys: state.commonReducer.selectedKeys
})

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: payload => dispatch(updateRouterMenuAction(payload))
})

export default connect(
  mapStateToProps,
  mapActionToProps
)(RouterMenu)