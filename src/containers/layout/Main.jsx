import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { findParentsByKey } from '@utils'
import { updateRouterMenuAction } from '@redux/common'
import {
  CompanyInfo,
  RouterMenu,
  User
} from '@components/main-layout'

const { Header, Content, Sider } = Layout

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    openKeys: PropTypes.array.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    updateRouterMenuAction: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
  }
  mountUpdateRouterMenu () {
    const selectedKeys = [window.$history && window.$history.location.pathname]
    const openKeys = findParentsByKey(window.$history && window.$history.location.pathname, this.props.router, 'path')

    this.props.updateRouterMenuAction(openKeys, selectedKeys)
  }
  render () {
    const { openKeys, selectedKeys } = this.props
    console.log(openKeys)
    console.log(selectedKeys)
    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="pull-left">
            <CompanyInfo className="company-info" companyAvator={require('@/favicon.ico')}></CompanyInfo>
          </div>
          <div className="pull-right">
            <User></User>
          </div>
        </Header>
        <Layout className="content-layout">
          <Sider className="sider">
            <RouterMenu selectedKeys={selectedKeys} openKeys={openKeys}></RouterMenu>
          </Sider>
          <Layout className="content">
            <Content style={{ position: 'relative' }}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
  componentDidMount () {
    this.mountUpdateRouterMenu()
  }
}

const mapStateToProps = state => ({
  openKeys: state.commonReducer.openKeys,
  selectedKeys: state.commonReducer.selectedKeys
})

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: (openKeys, selectedKeys) => dispatch(updateRouterMenuAction(openKeys, selectedKeys))
})

export default connect(
  mapStateToProps,
  mapActionToProps
)(MainLayout)