import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DETAIL,
  UPDATE_ENTRUST_INFO,
  UPDATE_REGISTER_CASE_INFO,
  DELETE_REGISTER_CASE_INFO,
  UPDATE_INSTANCE_INFO,
  DELETE_INSTANCE_INFO,
  UPDATE_EXEC_INFO,
  DELETE_EXEC_INFO,
  UPDATE_END_CASE_INFO,
  DELETE_END_CASE_INFO,
  DOWNLOAD_ATTACHMENTS
} = API_URL.caseDetail

// 获取案件详情数据
const fetchDetail = (id = '') => {
  return axios({
    url: FETCH_DETAIL(id),
    method: 'GET',
    showLoading: true,
    loadingMsg: '获取数据中...'
  })
}

// 新增/更新委案信息
const updateEntrustInfo = data => {
  return axios({
    url: UPDATE_ENTRUST_INFO,
    method: 'PUT',
    data,
    showLoading: true,
    loadingMsg: '保存中...'
  })
}

// 更新立案信息
const updateRegisterCaseInfo = data => {
  return axios({
    url: UPDATE_REGISTER_CASE_INFO,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '保存中...'
  })
}

// 删除立案信息
const deleteRegisterCaseInfo = (id, params = {}) => {
  return axios({
    url: DELETE_REGISTER_CASE_INFO(id),
    method: 'DELETE',
    params,
    showLoading: true,
    loadingMsg: '删除中...'
  })
}

// 更新审判信息
const updateInstanceInfo = data => {
  return axios({
    url: UPDATE_INSTANCE_INFO,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '保存中...'
  })
}

// 删除审判信息
const deleteInstanceInfo = (id, params = {}) => {
  return axios({
    url: DELETE_INSTANCE_INFO(id),
    method: 'DELETE',
    params,
    showLoading: true,
    loadingMsg: '删除中...'
  })
}

// 更新执行信息
const updateExecInfo = data => {
  return axios({
    url: UPDATE_EXEC_INFO,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '保存中...'
  })
}

// 删除执行信息
const deleteExecInfo = (id, params = {}) => {
  return axios({
    url: DELETE_EXEC_INFO(id),
    method: 'DELETE',
    params,
    showLoading: true,
    loadingMsg: '删除中...'
  })
}

// 更新结案信息
const updateEndCaseInfo = data => {
  return axios({
    url: UPDATE_END_CASE_INFO,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '保存中...'
  })
}

// 删除结案信息
const deleteEndCaseInfo = (id, params = {}) => {
  return axios({
    url: DELETE_END_CASE_INFO(id),
    method: 'DELETE',
    params,
    showLoading: true,
    loadingMsg: '删除中...'
  })
}

// 下载附件
const downloadAttachments = (caseId, params) => {
  return axios({
    url: DOWNLOAD_ATTACHMENTS(caseId),
    method: 'POST',
    params
  })
}

export {
  fetchDetail,
  updateEntrustInfo,
  updateRegisterCaseInfo,
  deleteRegisterCaseInfo,
  updateInstanceInfo,
  deleteInstanceInfo,
  updateExecInfo,
  deleteExecInfo,
  updateEndCaseInfo,
  deleteEndCaseInfo,
  downloadAttachments
}