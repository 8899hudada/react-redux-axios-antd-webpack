import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'

class Img extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
    style: PropTypes.object,
    onLoad: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentDidMount () {
    this.img.onload = () => {
      this.setState({
        loaded: true
      })
      this.props.onLoad()
    }
  }
  render () {
    const loaded = this.state.loaded
    const { src, alt, className } = this.props
    return (
      <React.Fragment>
        <img
          src={src}
          alt={alt}
          className={className}
          ref={img => this.img = img}
          style={{ display: loaded ? 'block' : 'none' }} />
        <div
          className={this.props.className}
          style={{ display: loaded ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}><Spin /></div>
      </React.Fragment>
    )
  }
}

Img.default = {
  style: {},
  onLoad: () => {}
}

export default Img