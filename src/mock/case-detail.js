import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_DETAIL,
  UPDATE_ENTRUST_INFO,
  UPDATE_REGISTER_CASE_INFO,
  DELETE_REGISTER_CASE_INFO,
  UPDATE_INSTANCE_INFO,
  DELETE_INSTANCE_INFO,
  UPDATE_EXEC_INFO,
  DELETE_EXEC_INFO,
  UPDATE_END_CASE_INFO,
  DELETE_END_CASE_INFO,
  DOWNLOAD_ATTACHMENTS
} = API_URL.caseDetail
const { Random } = Mock

Mock.mock(new RegExp(`^${HTTP_ROOT}/${FETCH_DETAIL()}\\d+$`), 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      caseInfo: {
        id: '@increment(1)',
        createTime: '@date(yyyy-MM-dd HH:mm)',
        updateTime: '@date(yyyy-MM-dd HH:mm)',
        createByName: '@cname()',
        caseProcess: "@pick(['新案', '一审', '二审', '结案'])",
        customName: '@cname()',
        idCard: Random.id(),
        entrustAmt: '@float(0, 1000000, 0, 2)',
        principalBalance: '@float(0, 1000000, 0, 2)',
        accountNumber: Random.id(),
        accountType: '@pick([0, 1, 2, 3])',
        trustorName: '@csentence(4, 8)',
        entrustDate: '@date()',
        productName: '@csentence(4, 8)',
        proxyLawyer: '@cname()'
      },
      registerCaseInfo: {
        id: '@increment(1)',
        lawCaseCode: '(@date(yyyy))川@integer(1000, 1500)民初@integer(1000, 1500)号',
        acceptCourt: '@city(true)人民法院',
        judgeName: '@cname()',
        judgePhone: /^1(3|4|5|7|8)\d{9}$/,
        judgeAssistName: '@cname()',
        judgeAssistPhone: /^1(3|4|5|7|8)\d{9}$/,
        registerTime: '@date()',
        prosecutionAmount: '@float(0, 1000000, 0, 2)',
        legalCosts: '@float(0, 1000000, 0, 2)',
        lawyerFee: '@float(0, 1000000, 0, 2)',
        caseFee: '@float(0, 1000000, 0, 2)',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: Random.image(['200x300']),
          fileProperty: 1
        }]
      },
      judgmentCaseInfo: [{
        id: '@increment(1)',
        judgePeriod: 1,
        assetsKey: '@csentence(100, 300)',
        guardAssets: '@csentence(100, 300)',
        guardFee: '@float(0, 1000000, 0, 2)',
        guardAmount: '@float(0, 1000000, 0, 2)',
        sealUpOrder: '@integer(1, 5)',
        openCourtTime: '@date(yyyy-MM-dd HH:mm)',
        openCourtResult: '@csentence(100, 300)',
        isNotice: '@boolean()',
        noticeFee: '@float(0, 1000000, 0, 2)',
        sealUpBeginDate: '@date()',
        sealUpEndDate: '@date()',
        'attachments|4-8': [{
          id: '@increment(1)',
          filePath: Random.image(['200x300']),
          fileProperty: '@pick([2, 3, 4])'
        }]
      }, {
        id: '@increment(1)',
        judgePeriod: 2,
        openCourtTime: '@date(yyyy-MM-dd HH:mm)',
        openCourtResult: '@csentence(100, 300)',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: Random.image(['200x300']),
          fileProperty: '@pick([5, 6])'
        }]
      }],
      executeCaseInfo: {
        id: '@increment(1)',
        executeCaseCode: '（@date(yyyy)）川@integer(1000, 1500)执@integer(1000, 1500)号',
        executeAcceptDate: '@date()',
        executePrescription: '执行时效@integer(1, 3)年',
        executeEndDate: '@date()',
        settleAccountDate: '@date()',
        receivedPaymentAmount: '@float(0, 1000000, 0, 2)',
        remark: '@csentence(100, 300)',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: Random.image(['200x300']),
          fileProperty: '@pick([7, 8])'
        }]
      },
      closedCaseInfo: {
        id: '@increment(1)',
        closeCaseDate: '@date()',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: Random.image(['200x300']),
          fileProperty: 9
        }]
      }
    }
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_ENTRUST_INFO}`, 'put', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_REGISTER_CASE_INFO}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(new RegExp(`${HTTP_ROOT}/${DELETE_REGISTER_CASE_INFO()}\\d+`), 'delete', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_INSTANCE_INFO}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(new RegExp(`${HTTP_ROOT}/${DELETE_INSTANCE_INFO()}\\d+`), 'delete', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_EXEC_INFO}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(new RegExp(`${HTTP_ROOT}/${DELETE_EXEC_INFO()}\\d+`), 'delete', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_END_CASE_INFO}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(new RegExp(`${HTTP_ROOT}/${DELETE_END_CASE_INFO()}\\d+`), 'delete', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(new RegExp(`${HTTP_ROOT}/${DOWNLOAD_ATTACHMENTS()}`), 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      downloadUrl: "@url('http')"
    }
  })
})
