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

// 系统设置
API_URL.systemSetting = {
  // 委托方管理
  trustor: {
    FETCH_LIST: 'system/client/get',
    DELETE_TRUSTOR: (id = '') => `system/client/del/${id}`,
    CREATE_TRUSTOR: 'system/client/save',
    UPDATE_TRUSTOR: 'system/client/mod'
  }
}

export default API_URL