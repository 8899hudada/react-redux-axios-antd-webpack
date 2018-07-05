import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

const { UPLOAD_LOCAL, UPLOAD, CASE_IMPORT, FETCH_USER_INFO } = API_URL.common

Mock.mock(`${HTTP_ROOT}/${UPLOAD_LOCAL}`, 'post', {
  code: 200,
  ok: true,
  data: {
    filePath: '/tmp/tmp-upload-20180601135950192102_201801-捷越案件委案-test.xlsx'
  }
})

Mock.mock(`${HTTP_ROOT}/${UPLOAD}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      filePath: `@pick(['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg'])`
    }
  })
})

Mock.mock(`${HTTP_ROOT}/${CASE_IMPORT}`, 'post', {
  code: 200,
  ok: true
})

Mock.mock(`${HTTP_ROOT}/${FETCH_USER_INFO}`, 'get', {
  code: 200,
  ok: true,
  data: {
    id: '@id()',
    name: '@cname(2, 3)',
    phone: /^1(3|4|5|7|8)\d{9}$/,
    loginName: '@email()'
  }
})
