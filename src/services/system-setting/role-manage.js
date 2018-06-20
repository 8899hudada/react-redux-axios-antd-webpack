import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_ROLES,
  DELETE_ROLE,
  CREATE_ROLE,
  UPDATE_ROLE
} = API_URL.systemSetting.roleManage

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
    data,
    showLoading: true,
    showMessage: true
  })
}

/**
 * 删除角色
 * @param  {Number} id 查询参数
 * @return {Object} Promise
 */
const deleteRole = (id) => {
  return axios({
    url: DELETE_ROLE(id),
    method: 'DELETE',
    showLoading: true,
    showMessage: true
  })
}

/**
 * 添加角色
 * @param  {Object} data 新增角色参数
 * @param  {String} data.name 角色名称
 * @return {Object} Promise
 */
const createRole = (data = {}) => {
  return axios({
    url: CREATE_ROLE,
    method: 'POST',
    data,
    showLoading: true,
    showMessage: true
  })
}

/**
 * 修改角色
 * @param  {Object} data 编辑角色参数
 * @param  {Number} data。id 角色ID
 * @param  {String} data。name 角色名称
 * @return {Object} Promise
 */
const updateRole = (data = {}) => {
  return axios({
    url: UPDATE_ROLE,
    method: 'PUT',
    data,
    showLoading: true,
    showMessage: true
  })
}

export {
  fetchRoles,
  deleteRole,
  createRole,
  updateRole
}