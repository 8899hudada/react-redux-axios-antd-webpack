import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

Mock.mock(`${HTTP_ROOT}/${API_URL.trustor.FETCH_LIST}`, 'post', options => {
  const { name } = JSON.parse(options.body)
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      current: 1,
      pageSize: 10,
      total: 100,
      'pageData|10': [{
        id: '@id()',
        name: `${name}@csentence(2, 6)`
      }] 
    }
  })
})
