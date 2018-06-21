import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

Mock.mock(`${HTTP_ROOT}/${API_URL.admin.LOGIN}`, 'post', {
  code: 200,
  ok: true,
  data: {
    token: '432fewfewffewgregregegr'
  }
})

Mock.mock(`${HTTP_ROOT}/${API_URL.admin.LOGOUT}`, 'post', {
  code: 200,
  ok: true
})
