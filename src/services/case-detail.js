import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DETAIL,
  UPDATE_ENTRUST_INFO,
  UPDATE_REGISTER_CASE_INFO,
  DELETE_REGISTER_CASE_INFO
} = API_URL.caseDetail

const fetchDetail = (id = '') => {
  return axios({
    url: FETCH_DETAIL(id),
    method: 'GET',
    showLoading: true,
    loadingMsg: '获取数据中...'
  })
}

const updateEntrustInfo = data => {
  return axios({
    url: UPDATE_ENTRUST_INFO,
    method: 'PUT',
    data
  })
}

const updateRegisterCaseInfo = data => {
  return axios({
    url: UPDATE_REGISTER_CASE_INFO,
    method: 'POST',
    data
  })
}

const deleteRegisterCaseInfo = id => {
  return axios({
    url: DELETE_REGISTER_CASE_INFO(id),
    method: 'DELETE'
  })
}

export {
  fetchDetail,
  updateEntrustInfo,
  updateRegisterCaseInfo,
  deleteRegisterCaseInfo
}