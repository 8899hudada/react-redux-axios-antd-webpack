/**
 * 常用公共变量
 */

// 案件进程
const CASE_STATUS = [
  { id: -1, name: '全部' },
  { id: 1, name: '新案' },
  { id: 2, name: '立案' },
  { id: 3, name: '一审中' },
  { id: 4, name: '二审中' },
  { id: 5, name: '执行中' },
  { id: 6, name: '已结案' }
]

// 分配状态
const ASSIGN_STATUS = [
  { value: -1, name: '全部' },
  { value: 1, name: '已分配' },
  { value: 0, name: '未分配' }
]

// 账号类型
const ACCOUNT_TYPES = {
  0: '金融账号',
  1: '借款借据号',
  2: '合同编号',
  3: '信用卡号'
}

// 导入状态
const IMPORT_STATES = {
  0: '导入中',
  1: '导入成功',
  2: '导入失败'
}

// 不需要权限的路由
const NOT_NEED_AUTH_ROUTE_PATHS = ['/login']

export {
  CASE_STATUS,
  ASSIGN_STATUS,
  ACCOUNT_TYPES,
  IMPORT_STATES,
  NOT_NEED_AUTH_ROUTE_PATHS
}