import axios from 'axios'
import { API_URL } from '@/constants'

const { FETCH_LIST, FETCH_TASK_ERRS } = API_URL.task

// 获取任务列表
const fetchList = params => {
  return axios({
    url: FETCH_LIST,
    method: 'GET',
    params
  })
}

// 获取任务错误原因列表
const fetchTaskErrs = params => {
  return axios({
    url: FETCH_TASK_ERRS,
    method: 'GET',
    params
  })
}

export {
  fetchList,
  fetchTaskErrs
}