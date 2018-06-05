import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_LIST,
  DELETE_TRUSTOR,
  CREATE_TRUSTOR,
  UPDATE_TRUSTOR
} = API_URL.systemSetting.trustor

Mock.mock(`${HTTP_ROOT}/${FETCH_LIST}`, 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    'data|10': [{
      id: '@id()',
      name: '@csentence(2, 6)'
    }]
  })
})

Mock.mock(new RegExp(`^${HTTP_ROOT}/${DELETE_TRUSTOR()}\\d+$`), 'delete', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(`${HTTP_ROOT}/${CREATE_TRUSTOR}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_TRUSTOR}`, 'put', () => {
  return Mock.mock({
    code: 200,
    ok: true
  })
})
