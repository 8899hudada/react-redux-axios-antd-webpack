import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_ROLES,
  DELETE_ROLE,
  CREATE_ROLE,
  UPDATE_ROLE
} = API_URL.systemSetting.roleManage

Mock.mock(`${HTTP_ROOT}/${FETCH_ROLES}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      'pageData|10': [{
        id: '@increment(1)',
        name: '@csentence(2, 6)'
      }]
    }
  })
})

Mock.mock(new RegExp(`^${HTTP_ROOT}/${DELETE_ROLE()}\\d+$`), 'delete', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${CREATE_ROLE}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: null
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_ROLE}`, 'put', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: null
  })
})
