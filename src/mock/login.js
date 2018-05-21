import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@/constant'

const HTTP_ROOT = API_ROOT.HTTP

Mock.mock(`${HTTP_ROOT}/${API_URL.LOGOUT}`, 'post', {
  code: 200,
  ok: true
})
