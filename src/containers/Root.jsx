import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MainLayout from './layout/Main'
import router from '@/router'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'
import { RouteWrapper } from '@/components/common'
import { getLocalStorage, findParentsByKey } from '@utils'
import { updateRouterMenuAction } from '@redux/common'

const MissWay = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@components/MissWay')))
const Login = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./Login')))

class Root extends Component {
  static propTypes = {
    updateRouterMenuAction: PropTypes.func.isRequired,
    selectedKeys: PropTypes.array.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      Layout: MainLayout
    }

    this.swicthLayout = this.swicthLayout.bind(this)
    this.handleRouterChange = this.handleRouterChange.bind(this)
  }
  swicthLayout (Layout) {
    this.setState({Layout})
  }
  updateRouterMenu () {
    const selectedKeys = [window.$history && window.$history.location.pathname]
    const openKeys = findParentsByKey(window.$history && window.$history.location.pathname, router, 'path')

    this.props.updateRouterMenuAction({
      openKeys,
      selectedKeys
    })
  }
  handleRouterChange ({ pathname }) {
    if (!this.props.selectedKeys.includes(pathname)) {
      this.props.updateRouterMenuAction({
        selectedKeys: [pathname]
      })
    }
  }
  render () {
    const Layout = this.state.Layout

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/">
            <Layout router={router}>
              <Switch>
                <RouteWrapper routes={router.children}></RouteWrapper>
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

    this.updateRouterMenu()
    window.$history.listen(this.handleRouterChange)
  }
}

const mapStateToProps = state => {
  return {selectedKeys: state.commonReducer.selectedKeys}
}

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: payload => dispatch(updateRouterMenuAction(payload))
})

export default connect(
  mapStateToProps,
  mapActionToProps
)(Root)
