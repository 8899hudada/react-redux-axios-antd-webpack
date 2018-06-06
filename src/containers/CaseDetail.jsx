import React from 'react'
import { BaseInfo, EntrustInfo, FirstInstanceInfo, SecondInstanceInfo, ExecInfo, EndCaseInfo } from '@components/case-detail'

class CaseDetail extends React.PureComponent {
  render () {
    return (
      <div style={{ padding: 20 }}>
        <BaseInfo />
        <EntrustInfo />
        <FirstInstanceInfo />
        <SecondInstanceInfo />
        <ExecInfo />
        <EndCaseInfo />
      </div>
    )
  }
}

export default CaseDetail