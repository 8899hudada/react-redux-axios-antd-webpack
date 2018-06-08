import React from 'react'
import { BaseInfo, EntrustInfo, RegisterCaseInfo, FirstInstanceInfo, SecondInstanceInfo, ExecInfo, EndCaseInfo } from '@components/case-detail'
import PropTypes from 'prop-types'
import { caseDetailService } from '@services'

class CaseDetail extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
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
    }
  }
  componentDidMount () {
    this.fetchDetail()
  }
  fetchDetail () {
    const caseId = this.props.match.params.id
    caseDetailService.fetchDetail(caseId).then(({ data }) => {
      this.setState({
        caseInfo: data.caseInfo
      })
    })
  }
  render () {
    const { caseInfo, registerCaseInfo, firstInstanceInfo, secondInstanceInfo, execInfo, endCaseInfo } = this.state
    return (
      <div style={{ padding: 20 }}>
        <BaseInfo params={caseInfo} />
        <EntrustInfo params={caseInfo} />
        <RegisterCaseInfo params={registerCaseInfo} />
        <FirstInstanceInfo params={firstInstanceInfo} />
        <SecondInstanceInfo params={secondInstanceInfo} />
        <ExecInfo params={execInfo} />
        <EndCaseInfo params={endCaseInfo} />
      </div>
    )
  }
}

export default CaseDetail