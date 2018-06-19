import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DEPARTMENTS,
  FETCH_DEPARTMENT_TREE,
  FETCH_DEPARTMENT_USER_TREE,
  FETCH_ROLES,
  DELETE_DEPARTMENT,
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT
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
 * 获取带人员的部门树
 * @return {Object} Promise
 */
const fetchDepartmentUserTree = () => {
  return axios({
    url: FETCH_DEPARTMENT_USER_TREE,
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

/**
 * 刪除部门
 * @param  {Number} id 部门ID
 * @return {Object} Promise
 */
const deleteDepartment = id => {
  return axios({
    url: DELETE_DEPARTMENT(id),
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param  {Object} data 新增部门参数
 * @param  {String} data.name 部门名称
 * @param  {Number} data.parentId 父部门ID
 * @return {Object} Promise
 */
const createDepartment = (data = {}) => {
  return axios({
    url: CREATE_DEPARTMENT,
    method: 'POST',
    data,
    showLoading: true,
    showMessage: true
  })
}

/**
 * 编辑部门
 * @param  {Object} data 修改部门参数
 * @param  {Number} data.id 部门ID
 * @param  {String} data.createdAt 创建时间
 * @param  {String} data.updatedAt 更新时间
 * @param  {String} data.name 部门名称
 * @param  {Number} data.parentId 父部门ID
 * @param  {Array} data.children 子节点
 * @return {Object} Promise
 */
const updateDepartment = (data = {}) => {
  return axios({
    url: UPDATE_DEPARTMENT,
    method: 'PUT',
    data,
    showLoading: true,
    showMessage: true
  })
}

export {
  fetchDepartments,
  fetchDepartmentTree,
  fetchDepartmentUserTree,
  fetchRoles,
  deleteDepartment,
  createDepartment,
  updateDepartment
}