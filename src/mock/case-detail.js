import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const { FETCH_DETAIL } = API_URL.caseDetail
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
        acceptCourt: '@city(trur)人民法院',
        judgeName: '@cname()',
        judgePhone: /^1[3|4|5|7|8]\d{9}$/,
        judgeAssistName: '@cname()',
        judgeAssistPhone: /^1[3|4|5|7|8]\d{9}$/,
        registerTime: '@date()',
        prosecutionAmount: '@float(0, 1000000, 0, 2)',
        legalCosts: '@float(0, 1000000, 0, 2)',
        lawyerFee: '@float(0, 1000000, 0, 2)',
        caseFee: '@float(0, 1000000, 0, 2)',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: `@pick(['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg'])`
        }]
      },
      judgmentCaseInfo: [{
        id: '@increment(1)',
        judgePeriod: 1,
        assetsKey: '@csentence(20, 40)',
        guardAssets: '@csentence(20, 40)',
        guardFee: '@float(0, 1000000, 0, 2)',
        guardAmount: '@float(0, 1000000, 0, 2)',
        sealUpOrder: '@integer(1, 5)',
        openCourtTime: '@date(yyyy-MM-dd HH:mm)',
        openCourtResult: '@csentence(20, 40)',
        isNotice: '@boolean()',
        noticeFee: '@float(0, 1000000, 0, 2)',
        sealUpBeginDate: '@date()',
        sealUpEndDate: '@date()',
        'attachments|4-8': [{
          id: '@increment(1)',
          filePath: `@pick(['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg'])`,
          fileProperty: '@pick([2, 3, 4])'
        }]
      }, {
        id: '@increment(1)',
        judgePeriod: 2,
        openCourtTime: '@date(yyyy-MM-dd HH:mm)',
        openCourtResult: '@csentence(20, 40)',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: `@pick(['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg'])`,
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
        remark: '@csentence(20, 40)',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: `@pick(['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg'])`,
          fileProperty: '@pick([7, 8])'
        }]
      },
      closedCaseInfo: {
        id: '@increment(1)',
        closeCaseDate: '@date()',
        'attachments|0-8': [{
          id: '@increment(1)',
          filePath: `@pick(['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg'])`,
          fileProperty: 9
        }]
      }
    }
  })
})
