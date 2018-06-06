let API_URL = {}

// 登录注销
API_URL.admin = {
  LOGIN: 'admin/login',
  LOGOUT: 'admin/logout'
}

// 公共
API_URL.common = {
  UPLOAD: 'file/local',
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
  },
  // 密码设置
  passwordSetting: {
    UPDATE_PASSWORD: 'account/uppwd'
  },
  // 部门管理
  departmentManage: {
    FETCH_DEPARTMENTS: 'system/dept/get',
    FETCH_DEPARTMENT_TREE: 'system/dept/tree',
    FETCH_DEPARTMENT_USER_TREE: 'system/dept/tree/user',
    FETCH_ROLES: 'system/role/get'
  },
  // 人员管理
  userManage: {
    FETCH_USERS: 'system/account/get'
  }
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