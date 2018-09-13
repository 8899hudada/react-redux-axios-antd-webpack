import axios from 'axios'
import { API_URL } from '@/constants'

const { FETCH_LIST, CREATE_CASE, DELETE_CASE, ASSIGN_CASE, EXPORT_CASE } = API_URL.caseManage

const fetchList = data => {
  return axios({
    url: FETCH_LIST,
    method: 'POST',
    data
  })
}

const createCase = data => {
  return axios({
    url: CREATE_CASE,
    method: 'POST',
    data
  })
}

const deleteCase = data => {
  return axios({
    url: DELETE_CASE,
    method: 'DELETE',
    data,
    showLoading: true,
    loadingMsg: '删除中...'
  })
}

const assignCase = data => {
  return axios({
    url: ASSIGN_CASE,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '处理中...'
  })
}

const exportCase = data => {
  return axios({
    url: EXPORT_CASE,
    method: 'POST',
    data,
    showLoading: true,
    loadingMsg: '导出中...'
  })
}

export {
  fetchList,
  createCase,
  deleteCase,
  assignCase,
  exportCase
}