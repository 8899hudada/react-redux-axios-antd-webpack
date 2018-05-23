import React from 'react'
import { connect } from 'react-redux'
import 'nprogress/nprogress.css'
import Nprogress from 'nprogress'
import PropTypes from 'prop-types'

const PageRouterSwitchProgress = (WrappedComponent) => {
  class PageRouterSwitchProgress extends React.PureComponent {
    static propTypes = {
      history: PropTypes.object.isRequired
    }
    constructor (props) {
      Nprogress.start()
      super(props)
      this.state = {
        display: true
      }
      
      // 将history实例放到window上面，便于在js代码里面进行路由控制
      if (!window.$history) {
        window.$history = props.history
      }
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
      return <WrappedComponent {...this.props}></WrappedComponent>
    }
  }

  const mapStateToProps = () => {
    return {}
  }

  const mapDispatchToProps = () => {
    return {}
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageRouterSwitchProgress)
}

export default PageRouterSwitchProgress