import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const {
  FETCH_DEPARTMENTS,
  FETCH_DEPARTMENT_TREE,
  FETCH_ROLES
} = API_URL.systemSetting.departmentManage

Mock.mock(`${HTTP_ROOT}/${FETCH_DEPARTMENTS}`, 'post', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      'pageData|10': [{
        id: '@increment(1)',
        name: '@csentence(2, 6)'
      }]
    }
  })
})

Mock.mock(`${HTTP_ROOT}/${FETCH_DEPARTMENT_TREE}`, 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: [{
      id: 1,
      name: '睿码科技',
      children: [{
        id: 2,
        name: '开发部',
        children: [{
          id: 11,
          name: '金融科技组',
          children: [],
          users: [{
            id: 12,
            name: '曾十'
          }]
        }],
        users: [{
          id: 3,
          name: '张三'
        }, {
          id: 4,
          name: '李四'
        }]
      }],
      users: [{
        id: 5,
        name: '陈八'
      }]
    }, {
      id: 6,
      name: '睿码金融',
      children: [{
        id: 7,
        name: '催收部',
        children: [],
        users: [{
          id: 8,
          name: '王五'
        }, {
          id: 9,
          name: '赵六'
        }]
      }],
      users: [{
        id: 10,
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
