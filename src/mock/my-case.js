import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const { FETCH_LIST } = API_URL.myCase

Mock.mock(`${HTTP_ROOT}/${FETCH_LIST}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      total: 100,
      'pageData|10': [{
        id: '@id()',
        customName: '@cname()',
        idCard: '@id()',
        trustorName: "@cword(2, 4)@pick(['金融', '消费', '银行'])",
        entrustDate: '@date()',
        entrustAmt: '@float(0, 1000000, 0, 2)',
        lawCaseCode: '(@date(yyyy))川@integer(1000, 1500)民初@integer(1000, 1500)号',
        caseProcess: "@pick(['新案', '一审', '二审', '结案'])"
      }]
    }
  })
})
