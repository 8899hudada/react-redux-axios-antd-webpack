import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_LIST,
  DELETE_TRUSTOR,
  CREATE_TRUSTOR,
  UPDATE_TRUSTOR
} = API_URL.systemSetting.trustor

/**
 * 获取委托方列表
 * @param  {Object} params 请求参数
 * @param  {Number} params.pageSize 每页条数
 * @param  {Number} params.current 当前页码
 * @param  {String} params.name 名称模糊搜索
 * @return {Promise} Promise
 */
const fetchList = (params = {}) => {
  return axios({
    url: FETCH_LIST,
    method: 'GET',
    params
  })
}

/**
 * 删除委托方
 * @param  {String} id 委托方ID
 * @return {Promise} Promise
 */
const deleteTrustor = id => {
  return axios({
    url: DELETE_TRUSTOR(id),
    method: 'DELETE',
    showLoading: true,
    loadingMsg: '删除中...'
  })
}

/**
 * 创建委托方
 * @param  {Object} data 请求参数
 * @param  {String} data.name 委托方姓名
 * @return {Promise} Promise
 */
const createTrustor = (data = {}) => {
  return axios({
    url: CREATE_TRUSTOR,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '正在创建委托方...'
  })
}

/**
 * 更新委托方
 * @param  {Object} data 请求参数
 * @param  {String} data.id 委托方ID
 * @param  {String} data.name 委托方姓名
 * @return {Promise} Promise
 */
const updateTrustor = (data = {}) => {
  return axios({
    url: UPDATE_TRUSTOR,
    method: 'PUT',
    data,
    showLoading: true,
    loadingMsg: '正在修改委托方...'
  })
}

export {
  fetchList,
  deleteTrustor,
  createTrustor,
  updateTrustor
}