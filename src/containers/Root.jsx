import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MainLayout from './layout/Main'
import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'
import { RouteWrapper } from '@/components/common'
import { getLocalStorage, findParentsByKey, routerFactoryByPermissions } from '@utils'
import { updateRouterMenuAction, updateRouterAction } from '@redux/common'
import { commonService } from '@services'
import routerFactory from '@/router'
import { loadingDecorator } from '@decorator'

const MissWay = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@components/MissWay')))
const Login = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./Login')))
const CaseDetail = PageRouterSwitchProgress(AsyncLoadComponent(() => import('./CaseDetail')))

const mapStateToProps = state => {
  return {
    selectedKeys: state.commonReducer.selectedKeys,
    router: state.commonReducer.router
  }
}

const mapActionToProps = dispatch => ({
  updateRouterMenuAction: payload => dispatch(updateRouterMenuAction(payload)),
  updateRouterAction: payload => dispatch(updateRouterAction(payload))
})

@loadingDecorator
class Root extends Component {
  static propTypes = {
    updateRouterMenuAction: PropTypes.func.isRequired,
    updateRouterAction: PropTypes.func.isRequired,
    selectedKeys: PropTypes.array.isRequired,
    router: PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      Layout: MainLayout,
      loadingUserInfo: false,
      userName: '' // 登陆用户名
    }

    this.swicthLayout = this.swicthLayout.bind(this)
    this.handleRouterChange = this.handleRouterChange.bind(this)
    this.fetchUserInfo = this.fetchUserInfo.bind(this)
    this.toggleLoading = this.toggleLoading.bind(this)
  }
  swicthLayout (Layout) {
    this.setState({Layout})
  }
  updateRouterMenu () {
    const router = this.props.router
    const selectedKeys = [window.$history && window.$history.location.pathname]
    const openKeys = findParentsByKey(window.$history && window.$history.location.pathname, router, 'path') || []
    
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
  fetchUserInfo () {
    this.toggleLoading(true, 'loadingUserInfo')
    commonService.fetchUserInfo().then(({ data }) => {
      this.props.updateRouterAction(routerFactoryByPermissions(data.perms, routerFactory()))
      this.setState({ userName: data.name })
    }).finally(() => this.toggleLoading(false, 'loadingUserInfo'))
  }
  componentDidMount () {
    this.fetchUserInfo()
    setTimeout(() => {
      if (!getLocalStorage('token')) {
        window.$history && window.$history.push('/login')
      }
      
      this.updateRouterMenu()
      window.$history && window.$history.listen(this.handleRouterChange)
    }, 0)
  }
  render () {
    const { Layout, userName, loadingUserInfo } = this.state
    const router = this.props.router
    
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/case-detail/:id" component={CaseDetail}></Route>
          {
            loadingUserInfo ? null : (
              <Route path="/">
                <Layout userName={userName}>
                  <Switch>
                    <RouteWrapper routes={router.children || []}></RouteWrapper>
                    <Redirect from='//' to='/my-case'/>
                    <Route component={MissWay}></Route>
                  </Switch>
                </Layout>
              </Route>
            )
          }
        </Switch>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapActionToProps)(Root)
