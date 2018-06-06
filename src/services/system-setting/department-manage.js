import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DEPARTMENTS,
  FETCH_DEPARTMENT_TREE,
  FETCH_ROLES
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
    data
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

/**
 * 获取角色列表
 * @param  {Object} data 查询参数
 * @param  {Number} data.pageSize
 * @param  {String} data.name
 * @param  {Number} data.current
 * @return {Object} Promise
 */
const fetchRoles = (data = {}) => {
  return axios({
    url: FETCH_ROLES,
    method: 'POST',
    data
  }) 
}

export {
  fetchDepartments,
  fetchDepartmentTree,
  fetchRoles
}