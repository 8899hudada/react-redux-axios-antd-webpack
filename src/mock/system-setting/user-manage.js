import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_STATUS,
  UPDATE_USER_PASSWORD,
  FETCH_PERMISSION_TREE,
  UPDATE_USER_PERMISSION,
  FETCH_ALL_LAWYERS
} = API_URL.systemSetting.userManage

Mock.mock(`${HTTP_ROOT}/${FETCH_USERS}`, 'post', options => {
  const body = JSON.parse(options.body) || {}
  const { pageSize = 10, current = 1 } = body
  
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      current, 
      total: 100,
      pageSize: pageSize,
      [`pageData|${pageSize}`]: [{
        id: '@increment(1)',
        name: '@csentence(2, 6)',
        phone: /^1[0-9]{10}$/,
        loginName: '@string(5, 10)',
        dept: {
          id: '@increment(1)',
          name: '@csentence(2, 6)'
        },
        role: {
          id: '@increment(1)',
          name: '@csentence(2, 6)',
          'havePerm|1': true
        },
        'status|1': true,
        'perms|1-10': [
          {
            'id|1-10': 1,
            'type|0-1': 1 
          }
        ]
      }]
    }
  })
})

Mock.mock(`${HTTP_ROOT}/${CREATE_USER}`, 'post', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${UPDATE_USER}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(new RegExp(`^${HTTP_ROOT}/${DELETE_USER()}\\d+$`), 'delete', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${UPDATE_USER_STATUS}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${UPDATE_USER_PASSWORD}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${FETCH_PERMISSION_TREE}`, 'get', () => Mock.mock({
  code: 200,
  ok: true,
  data: {
    casePerm: {
      id: '@increment(1)',
      parentId: -1,
      name: '案件权限',
      code: '10000',
      type: 0,
      children: [
        {
          id: 2,
          parentId: 1,
          children: [],
          name: '分配案件',
          code: '11000',
          type: 0
        },
        {
          id: 3,
          parentId: 1,
          children: [],
          name: '导出案件',
          code: '12000',
          type: 0
        },
        {
          id: 4,
          parentId: 1,
          children: [],
          name: '查看部门成员案件',
          code: '13000',
          type: 0
        },
        {
          id: 5,
          parentId: 1,
          children: [],
          name: '查看关联催收案件',
          code: '14000',
          type: 0
        }
      ]
    },
    menuPerm: {
      id: 6,
      parentId: -1,
      name: '菜单权限',
      code: '20000',
      type: 1,
      children: [
        {
          id: 7,
          parentId: 6,
          name: '我的案件',
          code: '21000',
          type: 1,
          children: [
            {
              id: 8,
              parentId: 7,
              children: [],
              name: '新增案件',
              code: '21100',
              type: 1
            },
            {
              id: 9,
              parentId: 7,
              children: [],
              name: '导入案件',
              code: '21200',
              type: 1
            }
          ]
        },
        {
          id: 10,
          parentId: 6,
          name: '案件管理',
          code: '22000',
          type: 1,
          children: [
            {
              id: 11,
              parentId: 10,
              children: [],
              name: '新增案件',
              code: '22100',
              type: 1
            },
            {
              id: 12,
              parentId: 10,
              children: [],
              name: '导入案件',
              code: '22200',
              type: 1
            }
          ]
        },
        {
          id: 13,
          parentId: 6,
          name: '系统设置',
          code: '23000',
          type: 1,
          children: [
            {
              id: 14,
              parentId: 13,
              children: [],
              name: '权限管理',
              code: '23100',
              type: 1
            },
            {
              id: 16,
              parentId: 13,
              children: [],
              name: '部门管理',
              code: '23300',
              type: 1
            },
            {
              id: 17,
              parentId: 13,
              children: [],
              name: '修改密码',
              code: '23400',
              type: 1
            },
            {
              id: 18,
              parentId: 13,
              children: [],
              name: '委托方管理',
              code: '23500',
              type: 1
            },
            {
              id: 15,
              parentId: 13,
              children: [],
              name: '人员管理',
              code: '23200',
              type: 1
            }
          ]
        }
      ]
    }
  }
}))


Mock.mock(`${HTTP_ROOT}/${UPDATE_USER_PERMISSION}`, 'put', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${FETCH_ALL_LAWYERS}`, 'get', () => Mock.mock({
  code: 200,
  ok: true,
  'data|10-20': [{
    id: '@increment()',
    name: '@cname(2, 3)'
  }]
}))