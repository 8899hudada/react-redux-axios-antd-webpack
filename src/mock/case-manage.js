import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const { FETCH_LIST } = API_URL.caseManage

Mock.mock(`${HTTP_ROOT}/${FETCH_LIST}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      total: 100,
      'pageData|10-15': [{
        id: '@id()',
        fileName: `@csentence(2, 6)`,
        taskState: `@csentence(2, 6)`,
        trustorName: `@csentence(2, 6)`,
        createBy: `@csentence(2, 6)`,
        createTime: `@date()`
      }]
    }
  })
})
