import axios from 'axios'
import { API_URL } from '@/constants'

const { FETCH_LIST } = API_URL.task

const fetchList = params => {
  return axios({
    url: FETCH_LIST,
    method: 'GET',
    params
  })
}

export {
  fetchList
}