import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import {
  CompanyInfo,
  RouterMenu,
  User
} from '@components/main-layout'
import { commonService } from '@services'

const { Header, Content, Sider } = Layout

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }
  }
  componentDidMount () {
    this.fetchUserInfo()
  }
  fetchUserInfo () {
    commonService.fetchUserInfo().then(({ data }) => {
      this.setState({ userName: data.name })
    })
  }
  render () {
    const { userName } = this.state
    return (
      <Layout className="main-layout">
        <Header className="header">
          <div className="pull-left">
            <CompanyInfo className="company-info" companyAvator={require('@/favicon.ico')}></CompanyInfo>
          </div>
          <div className="pull-right">
            <User userName={userName}></User>
          </div>
        </Header>
        <Layout className="content-layout">
          <Sider className="sider">
            <RouterMenu></RouterMenu>
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