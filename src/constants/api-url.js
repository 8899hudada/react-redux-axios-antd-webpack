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

// 任务管理
API_URL.task = {
  FETCH_LIST: 'tasks'
}

// 案件管理
API_URL.caseManage = {
  FETCH_LIST: 'case/manage/list'
}

export default API_URL