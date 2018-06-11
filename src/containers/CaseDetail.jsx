import React from 'react'
import { BaseInfo, EntrustInfo, RegisterCaseInfo, FirstInstanceInfo, SecondInstanceInfo, ExecInfo, EndCaseInfo } from '@components/case-detail'
import PropTypes from 'prop-types'
import { caseDetailService } from '@services'

const initDataFactory = () => ({
  caseInfo: {
    id: '',
    createTime: '',
    updateTime: '',
    createByName: '',
    caseProcess: "",
    customName: '',
    idCard: '',
    entrustAmt: '',
    principalBalance: '',
    accountNumber: '',
    accountType: '',
    trustorName: '',
    entrustDate: '',
    productName: '',
    proxyLawyer: ''
  },
  registerCaseInfo: {
    id: '',
    lawCaseCode: '',
    acceptCourt: '',
    judgeName: '',
    judgePhone: '',
    judgeAssistName: '',
    judgeAssistPhone: '',
    registerTime: '',
    prosecutionAmount: '',
    legalCosts: '',
    lawyerFee: '',
    caseFee: '',
    attachments: []
  },
  firstInstanceInfo: {
    id: '',
    assetsKey: '',
    guardAssets: '',
    guardFee: '',
    guardAmount: '',
    sealUpOrder: '',
    openCourtTime: '',
    openCourtResult: '',
    isNotice: '',
    noticeFee: '',
    sealUpBeginDate: '',
    sealUpEndDate: '',
    attachments: []
  },
  secondInstanceInfo: {
    id: '',
    openCourtTime: '',
    openCourtResult: '',
    attachments: []
  },
  execInfo: {
    id: '',
    executeCaseCode: '',
    executeAcceptDate: '',
    executePrescription: '',
    executeEndDate: '',
    settleAccountDate: '',
    receivedPaymentAmount: '',
    remark: '',
    attachments: []
  },
  endCaseInfo: {
    id: '',
    closeCaseDate: '',
    attachments: []
  }
})

class CaseDetail extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      ...initDataFactory()
    }
    this.fetchDetail = this.fetchDetail.bind(this)
  }
  componentDidMount () {
    this.fetchDetail()
  }
  fetchDetail () {
    const caseId = this.props.match.params.id
    caseDetailService.fetchDetail(caseId).then(({ data }) => {
      const caseInfo = data.caseInfo
      const registerCaseInfo = data.registerCaseInfo
      const judgmentCaseInfo = data.judgmentCaseInfo
      const firstInstanceInfo = 
        judgmentCaseInfo 
          ? data.judgmentCaseInfo.filter(item => item.judgePeriod === 1).length > 0
            ? data.judgmentCaseInfo.filter(item => item.judgePeriod === 1)[0]
            : null
          : null
      const secondInstanceInfo = 
        judgmentCaseInfo
          ? data.judgmentCaseInfo.filter(item => item.judgePeriod === 2).length > 0
            ? data.judgmentCaseInfo.filter(item => item.judgePeriod === 2)[0]
            : null
          : null
      const execInfo = data.executeCaseInfo
      const endCaseInfo = data.closedCaseInfo
      this.setState(() => {
        return {
          caseInfo: caseInfo ? caseInfo : initDataFactory().caseInfo,
          registerCaseInfo: registerCaseInfo ? registerCaseInfo : initDataFactory().registerCaseInfo,
          firstInstanceInfo: firstInstanceInfo ? firstInstanceInfo : initDataFactory().firstInstanceInfo,
          secondInstanceInfo: secondInstanceInfo ? secondInstanceInfo : initDataFactory().secondInstanceInfo,
          execInfo: execInfo ? execInfo : initDataFactory().execInfo,
          endCaseInfo: endCaseInfo ? endCaseInfo : initDataFactory().endCaseInfo
        }
      })
    })
  }
  render () {
    const { caseInfo, registerCaseInfo, firstInstanceInfo, secondInstanceInfo, execInfo, endCaseInfo } = this.state
    return (
      <div style={{ padding: 20 }}>
        <BaseInfo params={caseInfo} />
        <EntrustInfo params={caseInfo} fetchMethod={this.fetchDetail} />
        <RegisterCaseInfo params={registerCaseInfo} style={{ display: !registerCaseInfo.id && 'none' }} />
        <FirstInstanceInfo params={firstInstanceInfo} style={{ display: !firstInstanceInfo.id && 'none' }} />
        <SecondInstanceInfo params={secondInstanceInfo} style={{ display: !secondInstanceInfo.id && 'none' }} />
        <ExecInfo params={execInfo} style={{ display: !execInfo.id && 'none' }} />
        <EndCaseInfo params={endCaseInfo} style={{ display: !endCaseInfo.id && 'none' }} />
      </div>
    )
  }
}

export default CaseDetail