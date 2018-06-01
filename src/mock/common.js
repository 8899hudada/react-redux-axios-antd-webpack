import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

Mock.mock(`${HTTP_ROOT}/${API_URL.common.UPLOAD}`, 'post', {
  code: 200,
  ok: true,
  data: {
    filePath: '/tmp/tmp-upload-20180601135950192102_201801-捷越案件委案-test.xlsx'
  }
})

Mock.mock(`${HTTP_ROOT}/${API_URL.common.CASE_IMPORT}`, 'post', {
  code: 200,
  ok: true
})
