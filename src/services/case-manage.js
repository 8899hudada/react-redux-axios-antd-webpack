import axios from 'axios'
import { API_URL } from '@/constants'

const { FETCH_LIST, CREATE_CASE } = API_URL.caseManage

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

export {
  fetchList,
  createCase
}