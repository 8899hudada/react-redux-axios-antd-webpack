import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]

Mock.mock(`${HTTP_ROOT}/${API_URL.common.UPLOAD_LOCAL}`, 'post', {
  code: 200,
  ok: true,
  data: {
    filePath: '/tmp/tmp-upload-20180601135950192102_201801-捷越案件委案-test.xlsx'
  }
})

Mock.mock(`${HTTP_ROOT}/${API_URL.common.UPLOAD}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      filePath: `@pick([
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4092268509,251462197&fm=27&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4164555870,3002820394&fm=27&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1419019225,602323004&fm=27&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1714044262,2852531957&fm=27&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1311341921,1695746849&fm=27&gp=0.jpg'
      ])`
    }
  })
})

Mock.mock(`${HTTP_ROOT}/${API_URL.common.CASE_IMPORT}`, 'post', {
  code: 200,
  ok: true
})
