import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import {
  CompanyInfo,
  FirstLevelRouter,
  SecondLevelRouter,
  User
} from '@components/main-layout'

const { Header, Content, Sider } = Layout

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    activeFirstLevelRoute: PropTypes.object
  }
  constructor(props) {
    super(props)
  }
  render () {
    const activeFirstLevelRoute = this.props.activeFirstLevelRoute

    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="pull-left">
            <CompanyInfo className="company-info" companyAvator={require('@/favicon.ico')}></CompanyInfo>
            <FirstLevelRouter activeRoute={activeFirstLevelRoute}></FirstLevelRouter>
          </div>
          <div className="pull-right">
            <User></User>
          </div>
        </Header>
        <Layout className="content-layout">
          <Sider className="sider">
            <SecondLevelRouter activeFirstLevelRoute={activeFirstLevelRoute}></SecondLevelRouter>
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
}

export default MainLayout