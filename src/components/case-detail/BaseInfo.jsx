import React from 'react'
import { Card, Button, Menu, Dropdown, Row, Col, Form } from 'antd'
import PropTypes from 'prop-types'
import styles from './style'

const MenuItem = Menu.Item
const FormItem = Form.Item

class BaseInfo extends React.PureComponent {
  static propTypes = {
    params: PropTypes.object
  }
  render () {
    const menu = (
      <Menu>
        <MenuItem key="1" disabled>立案信息</MenuItem>
        <MenuItem key="2">一审信息</MenuItem>
        <MenuItem key="3" disabled>二审信息</MenuItem>
        <MenuItem key="4">执行信息</MenuItem>
        <MenuItem key="5">结案信息</MenuItem>
      </Menu>
    )
    const extra = (
      <div>
        <Button icon="download" style={{ marginRight: 10 }}>附件下载</Button>
        <Dropdown overlay={menu}>
          <Button icon="plus" type="primary">补充案件信息</Button>
        </Dropdown>
      </div>
    )
    const { params } = this.props 
    return (
      <Card
        title={<h3>案件详情</h3>}
        extra={extra}>
        <Row>
          <Col span={16}>
            <Row>
              <Col span={12}>
                <FormItem label="创建日期" style={{ display: 'flex' }}>
                  <span>{params.createTime}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="最近更新日期" style={{ display: 'flex' }}>
                  <span>{params.updateTime}</span>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem label="创建人" style={{ display: 'flex' }}>
                  <span>{params.createByName}</span>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="案件状态" style={{ display: 'flex' }}>
                  <span>{params.caseProcess}</span>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={8} className={styles['col-item-single']}>关联催收案件：<a href="javascript:;">0</a></Col>
        </Row>
      </Card>
    )
  }
}

export default BaseInfo