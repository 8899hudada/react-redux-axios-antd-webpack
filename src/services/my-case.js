import axios from 'axios'
import { API_URL } from '@/constants'

const { FETCH_LIST } = API_URL.myCase

const fetchList = data => {
  return axios({
    url: FETCH_LIST,
    method: 'POST',
    data
  })
}

export {
  fetchList
}