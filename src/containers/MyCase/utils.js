/**
 * 案件管理工具方法
 */

const formatSearchParams = searchParams => ({
  lawCaseCode: searchParams.lawCaseCode ? searchParams.lawCaseCode : null,
  trustorId: searchParams.trustorId === -1 ? null : searchParams.trustorId,
  caseStatus: searchParams.caseStatus === -1 ? null : searchParams.caseStatus,
  entrustDateBegin: searchParams.entrustDate.length ? searchParams.entrustDate[0].format('YYYY-MM-DD'): null,
  entrustDateEnd: searchParams.entrustDate.length ? searchParams.entrustDate[1].format('YYYY-MM-DD'): null
})

const searchParamsFactory = () => ({
  customerName: '',
  entrustDate: [],
  trustorId: -1,
  lawCaseCode: '',
  caseStatus: -1
})

export {
  formatSearchParams,
  searchParamsFactory
}