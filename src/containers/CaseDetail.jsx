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
      ...initDataFactory(),
      localMenuShowObj: {
        registerCaseInfo: false,
        firstInstanceInfo: false,
        secondInstanceInfo: false,
        execInfo: false,
        endCaseInfo: false
      }
    }
    this.fetchDetail = this.fetchDetail.bind(this)
    this.menuClick = this.menuClick.bind(this)
    this.localDelete = this.localDelete.bind(this)
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
  menuClick ({ key }) {
    this.setState(prevState => ({
      localMenuShowObj: {
        ...prevState.localMenuShowObj,
        [key]: true
      }
    }))
  }
  localDelete (key) {
    this.setState(prevState => ({
      localMenuShowObj: {
        ...prevState.localMenuShowObj,
        [key]: false
      }
    }))
  }
  render () {
    const { caseInfo, registerCaseInfo, firstInstanceInfo, secondInstanceInfo, execInfo, endCaseInfo, localMenuShowObj } = this.state
    const caseId = this.props.match.params.id
    const extraDisableObj = {
      registerCaseInfo: Boolean(registerCaseInfo.id) || localMenuShowObj.registerCaseInfo,
      firstInstanceInfo: Boolean(firstInstanceInfo.id) || localMenuShowObj.firstInstanceInfo,
      secondInstanceInfo: Boolean(secondInstanceInfo.id) || localMenuShowObj.secondInstanceInfo,
      execInfo: Boolean(execInfo.id) || localMenuShowObj.execInfo,
      endCaseInfo: Boolean(endCaseInfo.id) || localMenuShowObj.endCaseInfo
    }
    return (
      <div style={{ padding: 20 }}>
        <BaseInfo
          params={caseInfo}
          extraDisableObj={extraDisableObj}
          menuClick={this.menuClick} />
        <EntrustInfo
          params={caseInfo}
          caseId={caseId}
          fetchMethod={this.fetchDetail} />
        <RegisterCaseInfo
          params={registerCaseInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !registerCaseInfo.id && !localMenuShowObj.registerCaseInfo && 'none' }} />
        <FirstInstanceInfo
          params={firstInstanceInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !firstInstanceInfo.id && 'none' }} />
        <SecondInstanceInfo
          params={secondInstanceInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !secondInstanceInfo.id && 'none' }} />
        <ExecInfo
          params={execInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !execInfo.id && 'none' }} />
        <EndCaseInfo
          params={endCaseInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !endCaseInfo.id && 'none' }} />
      </div>
    )
  }
}

export default CaseDetail