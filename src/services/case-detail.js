import axios from 'axios'
import { API_URL } from '@/constants'

const { FETCH_DETAIL } = API_URL.caseDetail

const fetchDetail = (id = '') => {
  return axios({
    url: FETCH_DETAIL(id),
    method: 'GET'
  })
}

export {
  fetchDetail
}