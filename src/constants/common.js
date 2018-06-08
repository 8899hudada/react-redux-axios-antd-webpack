/**
 * 常用公共变量
 */

// 案件进程
const CASE_PROCESSES = [
  { id: -1, name: '全部' },
  { id: 1, name: '新案' },
  { id: 2, name: '一审中' },
  { id: 3, name: '二审中' },
  { id: 4, name: '执行中' },
  { id: 5, name: '已结案' }
]

// 分配状态
const ASSIGN_STATUS = [
  { id: -1, name: '全部' },
  { id: 1, name: '已分配' },
  { id: 2, name: '未分配' }
]

// 账号类型
const ACCOUNT_TYPES = {
  0: '金融账号',
  1: '借款借据号',
  2: '合同编号',
  3: '信用卡号'
}

export {
  CASE_PROCESSES,
  ASSIGN_STATUS,
  ACCOUNT_TYPES
}