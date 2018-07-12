import axios from 'axios'
import { API_URL } from '@/constants'

const {
  UPDATE_PASSWORD
} = API_URL.passwordSetting

/**
 * 更新委托方
 * @param  {Object} data 请求参数
 * @param  {String} data.oldPassword 旧密码
 * @param  {String} data.newPassword 新密码
 * @param  {String} data.confirmPassword 确认密码
 * @return {Promise} Promise
 */
const updatePassword = (data = {}) => {
  return axios({
    url: UPDATE_PASSWORD,
    method: 'PUT',
    data,
    showLoading: true,
    showMessage: true,
    successMsg: '密码修改成功',
    loadingMsg: '正在修改密码...'
  })
}

export {
  updatePassword
}