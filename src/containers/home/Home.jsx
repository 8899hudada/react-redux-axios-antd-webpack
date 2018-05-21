import React from 'react'
import { connect } from 'react-redux'
import styles from '@styles/containers/home/home'

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className={styles['home-tips-box']}>
        <img
          src={require('@imgs/common/logo.png')}
          className={styles['home-tips-logo']} />
        <p className={styles['home-tips']}>React Demo</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {...state.homeReducer}
}

export default connect(
  mapStateToProps
)(Home)