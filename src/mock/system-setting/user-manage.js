import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_USERS
} = API_URL.systemSetting.userManage

Mock.mock(`${HTTP_ROOT}/${FETCH_USERS}`, 'post', options => {
  const body = JSON.parse(options.body) || {}
  const { pageSize = 10, current = 1 } = body
  
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      current, 
      total: 100,
      pageSize: pageSize,
      [`pageData|${pageSize}`]: [{
        id: '@id()',
        name: '@csentence(2, 6)',
        phone: /^1[0-9]{10}$/,
        loginName: '@string(5, 10)',
        dept: {
          name: '@csentence(2, 6)'
        },
        role: {
          name: '@csentence(2, 6)'
        },
        'status|1': [0, 1]
      }]
    }
  })
})

