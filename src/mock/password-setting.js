import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  UPDATE_PASSWORD
} = API_URL.passwordSetting

Mock.mock(`${HTTP_ROOT}/${UPDATE_PASSWORD}`, 'put', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    msg: '密码修改成功'
  })
})
