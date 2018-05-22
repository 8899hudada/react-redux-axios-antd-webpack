import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import MainLayout from './layout/Main'
import routes from '@/routes'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'
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
    const Routes = routes.map(route => {
      return (
        <Route
          key={route.path}
          path={route.path}
          render={
            props => (
              <route.component routes={route.children} {...props} />
            )
          }
          exact={false}
          strict={true}>
        </Route>
      )
    })

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/">
            <Layout>
              <Switch>
                {Routes}
                <Redirect from='//' to='/home'/>
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

const mapStateToProps = state => {
  return {activeFirstLevelRoute: state.commonReducer.activeFirstLevelRoute}
}

export default connect(
  mapStateToProps
)(Root)
