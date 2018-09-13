import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_DEPARTMENTS,
  FETCH_DEPARTMENT_TREE,
  FETCH_DEPARTMENT_USER_TREE,
  FETCH_ROLES,
  DELETE_DEPARTMENT,
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT
} = API_URL.systemSetting.departmentManage

Mock.mock(`${HTTP_ROOT}/${FETCH_DEPARTMENTS}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      'pageData|10': [{
        id: '@increment(1)',
        name: '@csentence(2, 6)',
        parentId: '@increment(1)'
      }]
    }
  })
})

Mock.mock(`${HTTP_ROOT}/${FETCH_DEPARTMENT_TREE}`, 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: [{
      id: '@increment(1)',
      name: '睿码科技',
      children: [{
        id: '@increment(1)',
        name: '开发部',
        children: [{
          id: '@increment(1)',
          name: '金融科技组',
          children: [],
          users: [{
            id: '@increment(1)',
            name: '曾十'
          }]
        }],
        users: [{
          id: '@increment(1)',
          name: '张三'
        }, {
          id: '@increment(1)',
          name: '李四'
        }]
      }],
      users: [{
        id: '@increment(1)',
        name: '陈八'
      }]
    }, {
      id: '@increment(1)',
      name: '睿码金融',
      children: [{
        id: '@increment(1)',
        name: '催收部',
        children: [],
        users: []
      }],
      users: [{
        id: '@increment(1)',
        name: '郑九'
      }]
    }]
  })
})

Mock.mock(`${HTTP_ROOT}/${FETCH_DEPARTMENT_USER_TREE}`, 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: [{
      id: '@increment(1)',
      name: '睿码科技',
      children: [{
        id: '@increment(1)',
        name: '开发部',
        children: [{
          id: '@increment(1)',
          name: '金融科技组',
          children: [],
          users: [{
            id: '@increment(1)',
            name: '曾十'
          }]
        }],
        users: [{
          id: '@increment(1)',
          name: '张三'
        }, {
          id: '@increment(1)',
          name: '李四'
        }]
      }],
      users: [{
        id: '@increment(1)',
        name: '陈八'
      }]
    }, {
      id: '@increment(1)',
      name: '睿码金融',
      children: [{
        id: '@increment(1)',
        name: '催收部',
        children: [],
        users: []
      }],
      users: [{
        id: '@increment(1)',
        name: '郑九'
      }]
    }]
  })
})

Mock.mock(`${HTTP_ROOT}/${FETCH_ROLES}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      'pageData|10': [{
        id:'@increment(1)',
        name: '@csentence(2, 6)'
      }]
    }
  })
})

Mock.mock(new RegExp(`^${HTTP_ROOT}/${DELETE_DEPARTMENT()}\\d+$`), 'delete', () => Mock.mock({
  code: 200,
  ok: true,
  data: null
}))

Mock.mock(`${HTTP_ROOT}/${CREATE_DEPARTMENT}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: null
  })
})

Mock.mock(`${HTTP_ROOT}/${UPDATE_DEPARTMENT}`, 'put', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: null
  })
})