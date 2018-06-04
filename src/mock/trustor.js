import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

Mock.mock(`${HTTP_ROOT}/${API_URL.trustor.FETCH_LIST}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    'data|10-15': [{
      id: '@id()',
      name: `${name}@csentence(2, 6)`
    }]
  })
})
