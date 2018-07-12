let API_URL = {}

// 登录注销
API_URL.admin = {
  LOGIN: 'account/login',
  LOGOUT: 'account/logout'
}

// 公共
API_URL.common = {
  UPLOAD_LOCAL: 'file/local',
  UPLOAD: 'file/upload',
  CASE_IMPORT: 'import/excel',
  FETCH_USER_INFO: 'account/session'
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
  // 部门管理
  departmentManage: {
    FETCH_DEPARTMENTS: 'system/dept/get',
    FETCH_DEPARTMENT_TREE: 'system/dept/tree',
    FETCH_DEPARTMENT_USER_TREE: 'system/dept/tree/user',
    DELETE_DEPARTMENT: (id = '') => `system/dept/del/${id}`,
    CREATE_DEPARTMENT: 'system/dept/save',
    UPDATE_DEPARTMENT: 'system/dept/mod'
  },
  // 人员管理
  userManage: {
    FETCH_USERS: 'system/account/get',
    CREATE_USER: 'system/account/save',
    UPDATE_USER: 'system/account/mod',
    DELETE_USER: (id = '') => `system/account/del/${id}`,
    UPDATE_USER_STATUS: 'system/account/status',
    UPDATE_USER_PASSWORD: 'system/account/uppwd',
    FETCH_PERMISSION_TREE: 'system/account/perms/tree',
    UPDATE_USER_PERMISSION: 'system/account/perms',
    FETCH_ALL_LAWYERS: 'system/account/lawyers'
  },
  // 角色管理
  roleManage: {
    FETCH_ROLES: 'system/role/get',
    DELETE_ROLE: (id = '') => `system/role/del/${id}`,
    CREATE_ROLE: 'system/role/save',
    UPDATE_ROLE: 'system/role/mod'
  }
}

// 任务管理
API_URL.task = {
  FETCH_LIST: 'tasks',
  FETCH_TASK_ERRS: `task/errors`
}

// 案件管理
API_URL.caseManage = {
  FETCH_LIST: 'case/manage/list',
  CREATE_CASE: 'case/manage/add',
  DELETE_CASE: 'case/manage/del',
  ASSIGN_CASE: 'case/manage/assign',
  EXPORT_CASE: 'export/case/excel'
}

// 我的案件
API_URL.myCase = {
  FETCH_LIST: 'case/manage/my-case/list'
}

// 案件详情
API_URL.caseDetail = {
  FETCH_DETAIL: (id = '') => `case/detail/${id}`,
  UPDATE_ENTRUST_INFO: 'case/detail/basic',
  UPDATE_REGISTER_CASE_INFO: 'case/detail/register',
  DELETE_REGISTER_CASE_INFO: (id = '') => `case/detail/register/${id}`,
  UPDATE_INSTANCE_INFO: 'case/detail/judgment',
  DELETE_INSTANCE_INFO: (id = '') => `case/detail/judgment/${id}`,
  UPDATE_EXEC_INFO: 'case/detail/execute',
  DELETE_EXEC_INFO: (id = '') => `case/detail/execute/${id}`,
  UPDATE_END_CASE_INFO: 'case/detail/closed',
  DELETE_END_CASE_INFO: (id = '') => `case/detail/closed/${id}`,
  DOWNLOAD_ATTACHMENTS: (caseId = '') => `case/detail/attachment/${caseId}`
}

// 密码设置
API_URL.passwordSetting = {
  UPDATE_PASSWORD: 'account/uppwd'
}

export default API_URL