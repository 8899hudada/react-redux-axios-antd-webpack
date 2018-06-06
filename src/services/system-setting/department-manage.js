import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DEPARTMENTS,
  FETCH_DEPARTMENT_TREE
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

/**
 * 获取部门树
 * @return {Object} Promise
 */
const fetchDepartmentTree = () => {
  return axios({
    url: FETCH_DEPARTMENT_TREE,
    method: 'GET',
    showLoading: true,
    showMessage: true
  })
}

export {
  fetchDepartments,
  fetchDepartmentTree
}