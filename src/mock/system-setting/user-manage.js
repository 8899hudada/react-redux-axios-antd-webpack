import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_STATUS,
  UPDATE_USER_PASSWORD
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
        id: '@increment(1)',
        name: '@csentence(2, 6)',
        phone: /^1[0-9]{10}$/,
        loginName: '@string(5, 10)',
        dept: {
          id: '@increment(1)',
          name: '@csentence(2, 6)'
        },
        role: {
          id: '@increment(1)',
          name: '@csentence(2, 6)'
        },
        'status|1': true
      }]
    }
  })
})


Mock.mock(`${HTTP_ROOT}/${CREATE_USER}`, 'post', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${UPDATE_USER}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(new RegExp(`^${HTTP_ROOT}/${DELETE_USER()}\\d+$`), 'delete', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${UPDATE_USER_STATUS}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${UPDATE_USER_PASSWORD}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))