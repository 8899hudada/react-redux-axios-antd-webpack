let API_URL = {}

// 登录注销
API_URL.admin = {
  LOGIN: 'admin/login',
  LOGOUT: 'admin/logout'
}

// 公共
API_URL.common = {
  UPLOAD: 'file/upload',
  CASE_IMPORT: 'import/excel'
}

// 委托方管理
API_URL.trustor = {
  FETCH_LIST: 'system/client/get'
}

export default API_URL