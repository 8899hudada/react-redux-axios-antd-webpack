import React from 'react'
import PropTypes from 'prop-types'
import { InfoCard } from '@components/case-detail'
import { Row, Col } from 'antd'
import styles from './style'
import { ACCOUNT_TYPES } from '@constants'

class EntrustInfo extends React.PureComponent {
  static propTypes = {
    params: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false
    }
    this.onEdit = this.onEdit.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  onEdit () {
    this.setState({ isEdit: true })
  }
  onCancel () {
    this.setState({ isEdit: false })
  }
  onSave () {
    this.setState({ isEdit: false })
  }
  render () {
    const { isEdit } = this.state
    const { params } = this.props
    return (
      <InfoCard
        title="委案信息"
        allowDelete={false}
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}>
        <Row>
          <Row>
            <Col span={8} className={styles['col-item']}>姓名：{params.customName}</Col>
            <Col span={8} className={styles['col-item']}>身份证：{params.idCard}</Col>
            <Col span={8} className={styles['col-item']}>委案金额：{params.entrustAmt}</Col>
          </Row>
          <Row>
            <Col span={8} className={styles['col-item']}>本金余额：{params.principalBalance}</Col>
            <Col span={8} className={styles['col-item']}>{ACCOUNT_TYPES[params.accountType] ? ACCOUNT_TYPES[params.accountType]: '账户'}：{params.accountNumber}</Col>
            <Col span={8} className={styles['col-item']}>委托方：{params.trustorName}</Col>
          </Row>
          <Row>
            <Col span={8} className={styles['col-item']}>委案日期：{params.entrustDate}</Col>
            <Col span={8} className={styles['col-item']}>产品名称：{params.productName}</Col>
            <Col span={8} className={styles['col-item']}>代理律师：{params.proxyLawyer}</Col>
          </Row>
        </Row>
      </InfoCard>
    )
  }
}

export default EntrustInfo