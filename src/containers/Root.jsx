import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import MainLayout from './layout/Main'
import routes from '@/routes'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'
import { RouteWrapper } from '@/components/common'
import { getLocalStorage } from '@utils'

const MissWay = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@components/MissWay')))
const Login = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./Login')))

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = {
      Layout: MainLayout
    }

    this.swicthLayout = this.swicthLayout.bind(this)
  }
  swicthLayout (Layout) {
    this.setState({Layout})
  }
  render () {
    const Layout = this.state.Layout

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/">
            <Layout>
              <Switch>
                <RouteWrapper routes={routes}></RouteWrapper>
                <Redirect from='//' to='/my-case'/>
                <Route component={MissWay}></Route>
              </Switch>
            </Layout>
          </Route>
        </Switch>
      </Router>
    )
  }
  componentDidMount () {
    if (!getLocalStorage('token')) {
      window.$history.push('/login')
    }
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(
  mapStateToProps
)(Root)
