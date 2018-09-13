import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_STATUS,
  UPDATE_USER_PASSWORD,
  FETCH_PERMISSION_TREE,
  UPDATE_USER_PERMISSION,
  FETCH_ALL_LAWYERS
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
  if (data.deptId === -1) {
    data.deptId = ''
  }
  
  if (data.roleId === -1) {
    data.roleId = ''
  }

  return axios({
    url: FETCH_USERS,
    method: 'POST',
    data
  })
}

/**
 * 创建人员
 * @param  {Object} data 创建人员参数
 * @param  {String} data.name 姓名
 * @param  {String} data.phone 员工电话
 * @param  {String} data.loginName 登录账号
 * @param  {Object} data.dept 部门
 * @param  {Object} data.role 角色
 * @param  {String} data.passwd 密码
 * @return {Promise} Promise
 */
const createUser = (data = {}) => {
  return axios({
    url: CREATE_USER,
    method: 'POST',
    showLoading: true,
    showMessage: true,
    loadingMsg: '正在创建人员...',
    data
  })
}

/**
 * 更新人员
 * @param  {Object} data 创建人员参数
 * @param  {String} data.id 人员ID
 * @param  {String} data.name 姓名
 * @param  {String} data.phone 员工电话
 * @param  {String} data.loginName 登录账号
 * @param  {Object} data.dept 部门
 * @param  {Object} data.role 角色
 * @param  {String} data.passwd 密码
 * @return {Promise} Promise
 */
const updateUser = (data = {}) => {
  return axios({
    url: UPDATE_USER,
    method: 'PUT',
    showLoading: true,
    showMessage: true,
    loadingMsg: '正在编辑人员...',
    data
  })
}

/**
 * 删除人员
 * @param  {Number} id 人员ID
 * @return {Promise} Promise
 */
const deleteUser = (id = '') => {
  return axios({
    url: DELETE_USER(id),
    method: 'DELETE',
    showLoading: true,
    showMessage: true,
    loadingMsg: '正在删除...'
  })
}

/**
 * 启用或者禁用人员状态
 * @param  {Number} id 人员ID
 * @param  {Boolean} status 人员状态
 * @return {Promise} Promise
 */
const updateUserStatus = (id, status) => {
  return axios({
    url: UPDATE_USER_STATUS,
    method: 'PUT',
    showLoading: true,
    showMessage: true,
    loadingMsg: `正在${status ? '禁用' : '停用'}...`,
    params: {
      id,
      status
    }
  })
}

/**
 * 更新人员密码
 * @param  {Number} userId 人员ID
 * @param  {String} passwd 人员密码
 * @return {Promise} Promise
 */
const updateUserPassword = (userId, passwd) => {
  return axios({
    url: UPDATE_USER_PASSWORD,
    method: 'PUT',
    showLoading: true,
    showMessage: true,
    loadingMsg: '正在重置密码...',
    successMsg: '密码重置成功',
    data: {
      userId,
      passwd
    }
  })
}

/**
 * 获取权限树
 * @return {Promise} Promise
 */
const fetchPermissionTree = () => {
  return axios({
    url: FETCH_PERMISSION_TREE,
    method: 'GET'
  })
}

/**
 * 更新人员权限
 * @param  {Object} data 更新人员权限参数
 * @param  {Number} data.userId 人员ID
 * @param  {Object} data.roleId 人员角色ID
 * @param  {Boolean} data.havePerm 默认下次添加该角色的权限
 * @param  {Array} data.perms 所选权限
 * @return {Promise} Promise
 */
const updateUserPermission = (data = {}) => {
  return axios({
    url: UPDATE_USER_PERMISSION,
    method: 'PUT',
    data,
    showLoading: true,
    showMessage: true
  })
}

/**
 * 获取所有律师
 * @return {Promise} Promise
 */
const fetchAllLawyers = () => {
  return axios({
    url: FETCH_ALL_LAWYERS,
    method: 'GET'
  })
}

export {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
  updateUserPassword,
  fetchPermissionTree,
  updateUserPermission,
  fetchAllLawyers
}