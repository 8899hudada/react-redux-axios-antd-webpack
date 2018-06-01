import axios from 'axios'
import { API_URL } from '@/constants'

const { CASE_IMPORT } = API_URL.common

const caseImport = data => {
  return axios({
    url: CASE_IMPORT,
    method: 'POST',
    data
  })
}

export {
  caseImport
}