import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DEPARTMENTS
} = API_URL.systemSetting.departmentManage

/**
 * 获取部门列表
 * @param  {Object} data 查询参数
 * @param  {Number} data.pageSize
 * @param  {String} data.name
 * @param  {Number} data.current
 * @return {Object} Promise
 */
const fetchDepartments = (data = {}) => {
  return axios({
    url: FETCH_DEPARTMENTS,
    method: 'POST',
    data,
    showLoading: true,
    showMessage: true
  })
}

export {
  fetchDepartments
}