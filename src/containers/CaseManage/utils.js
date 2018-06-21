/**
 * 案件管理工具方法
 */

const formatSearchParams = searchParams => ({
  lawCaseCode: searchParams.lawCaseCode ? searchParams.lawCaseCode : null,
  trustorId: searchParams.trustorId === -1 ? null : searchParams.trustorId,
  caseStatus: searchParams.caseStatus === -1 ? null : searchParams.caseStatus,
  assignStatus: searchParams.assignStatus === -1 ? null : Boolean(searchParams.assignStatus),
  proxyLawyer: searchParams.proxyLawyer === -1 ? null : searchParams.proxyLawyer,
  entrustDateBegin: searchParams.entrustDate.length ? searchParams.entrustDate[0].format('YYYY-MM-DD'): null,
  entrustDateEnd: searchParams.entrustDate.length ? searchParams.entrustDate[1].format('YYYY-MM-DD'): null,
  createTimeBegin: searchParams.createTime.length ? searchParams.createTime[0].format('YYYY-MM-DD'): null,
  createTimeEnd: searchParams.createTime.length ? searchParams.createTime[1].format('YYYY-MM-DD'): null
})

const searchParamsFactory = () => ({
  customerName: '',
  entrustDate: [],
  createTime: [],
  trustorId: -1,
  lawCaseCode: '',
  assignStatus: -1,
  caseStatus: -1,
  proxyLawyer: -1
})

export {
  formatSearchParams,
  searchParamsFactory
}