import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_DEPARTMENTS
} = API_URL.systemSetting.departmentManage

Mock.mock(`${HTTP_ROOT}/${FETCH_DEPARTMENTS}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      'pageData|10': [{
        id: '@id()',
        name: '@csentence(2, 6)'
      }]
    }
  })
})
