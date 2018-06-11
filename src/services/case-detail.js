import axios from 'axios'
import { API_URL } from '@/constants'

const {
  FETCH_DETAIL,
  UPDATE_ENTRUST_INFO
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

export {
  fetchDetail,
  updateEntrustInfo
}