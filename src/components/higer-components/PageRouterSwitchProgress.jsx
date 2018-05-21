import React from 'react'
import { connect } from 'react-redux'
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import PropTypes from 'prop-types'
import routes from '@/routes'
import { getFirstLevelRoute } from '@/utils'
import { updateActiveFirstLevelRouteAction } from '@/redux/common'

const PageRouterSwitchProgress = (WrappedComponent) => {
  class PageRouterSwitchProgress extends React.PureComponent {
    static propTypes = {
      history: PropTypes.object.isRequired,
      updateActiveFirstLevelRouteAction: PropTypes.func.isRequired
    }
    constructor (props) {
      Nprogress.start()
      super(props)
      
      // 将history实例放到window上面，便于在js代码里面进行路由控制
      if (!window.$history) {
        window.$history = props.history
      }
        
      const activeFirstLevelRoute = getFirstLevelRoute(window.$history.location.pathname, routes)
      this.props.updateActiveFirstLevelRouteAction(activeFirstLevelRoute)
    }
    componentWillUpdate () {
      Nprogress.start()
    }
    componentDidUpdate () {
      Nprogress.done()
    }
    componentDidMount () {
      Nprogress.done()
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = () => {
    return {}
  }

  const mapDispatchToProps = dispatch => {
    return {
      updateActiveFirstLevelRouteAction: activeFirstLevelRoute => {
        dispatch(updateActiveFirstLevelRouteAction(activeFirstLevelRoute))
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageRouterSwitchProgress)
}

export default PageRouterSwitchProgress