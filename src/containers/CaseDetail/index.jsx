import React from 'react'
import { BaseInfo, EntrustInfo, RegisterCaseInfo, FirstInstanceInfo, SecondInstanceInfo, ExecInfo, EndCaseInfo } from '@components/case-detail'
import PropTypes from 'prop-types'
import { caseDetailService } from '@services'
import { unique } from '@utils'
import { initDataFactory, initLocalMenuShowObjFactory, formatData } from './utils'

class CaseDetail extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      ...initDataFactory(),
      localMenuShowObj: initLocalMenuShowObjFactory()
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
          caseInfo: formatData(caseInfo, 'caseInfo'),
          registerCaseInfo: formatData(registerCaseInfo, 'registerCaseInfo'),
          firstInstanceInfo: formatData(firstInstanceInfo, 'firstInstanceInfo'),
          secondInstanceInfo: formatData(secondInstanceInfo, 'secondInstanceInfo'),
          execInfo: formatData(execInfo, 'execInfo'),
          endCaseInfo: formatData(endCaseInfo, 'endCaseInfo')
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
    }), () => {
      const el = document.querySelector(`#${key}`)
      el.scrollIntoView()
      this[key].onEdit()
    })
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
    const attachments = unique([
      ...registerCaseInfo.attachments,
      ...firstInstanceInfo.attachments,
      ...secondInstanceInfo.attachments,
      ...execInfo.attachments,
      ...endCaseInfo.attachments
    ].map(item => item.fileProperty))
    return (
      <div style={{ padding: 20 }}>
        <BaseInfo
          params={caseInfo}
          extraDisableObj={extraDisableObj}
          menuClick={this.menuClick}
          caseId={caseId}
          attachments={attachments} />
        <EntrustInfo
          params={caseInfo}
          caseId={caseId}
          fetchMethod={this.fetchDetail} />
        <RegisterCaseInfo
          params={registerCaseInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !registerCaseInfo.id && !localMenuShowObj.registerCaseInfo && 'none' }}
          wrappedComponentRef={dom => this.registerCaseInfo = dom} />
        <FirstInstanceInfo
          params={firstInstanceInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !firstInstanceInfo.id && !localMenuShowObj.firstInstanceInfo && 'none' }}
          wrappedComponentRef={dom => this.firstInstanceInfo = dom} />
        <SecondInstanceInfo
          params={secondInstanceInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !secondInstanceInfo.id && !localMenuShowObj.secondInstanceInfo && 'none' }}
          wrappedComponentRef={dom => this.secondInstanceInfo = dom} />
        <ExecInfo
          params={execInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !execInfo.id && !localMenuShowObj.execInfo && 'none' }}
          wrappedComponentRef={dom => this.execInfo = dom} />
        <EndCaseInfo
          params={endCaseInfo}
          caseId={caseId}
          localDelete={this.localDelete}
          fetchMethod={this.fetchDetail}
          style={{ display: !endCaseInfo.id && !localMenuShowObj.endCaseInfo && 'none' }}
          wrappedComponentRef={dom => this.endCaseInfo = dom} />
      </div>
    )
  }
}

export default CaseDetail