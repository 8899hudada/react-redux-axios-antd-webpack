import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_USERS
} = API_URL.systemSetting.userManage

/**
 * 获取用户列表
 * @param  {Object} data 请求参数
 * @param  {Number} data.pageSize 每页条数
 * @param  {Number} data.current 当前页码
 * @param  {String} data.name 名称模糊搜索
 * @param  {String} data.phone 电话
 * @param  {String} data.deptId 部门ID
 * @param  {String} data.roleId 角色ID
 * @return {Promise} Promise
 */
const fetchUsers = (data = {}) => {
  return axios({
    url: FETCH_USERS,
    method: 'POST',
    showLoading: true,
    data
  })
}

export {
  fetchUsers
}