import React from 'react'
import { InfoCard } from '@components/case-detail'

class EntrustInfo extends React.PureComponent {
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
    return (
      <InfoCard
        title="委案信息"
        allowDelete={false}
        isEdit={isEdit}
        onEdit={this.onEdit}
        onCancel={this.onCancel}
        onSave={this.onSave}></InfoCard>
    )
  }
}

export default EntrustInfo