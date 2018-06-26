import Mock from 'mockjs'
import { API_ROOT, API_URL } from '@constants'

const HTTP_ROOT = API_ROOT[process.env.ENV]
const { FETCH_LIST, FETCH_TASK_ERRS } = API_URL.task

Mock.mock(new RegExp(`^(${HTTP_ROOT}/${FETCH_LIST})`), 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      total: 100,
      'pageData|10-15': [{
        id: '@id()',
        fileName: `@csentence(2, 6)`,
        taskState: `@pick(['0', '1', '2'])`,
        trustorName: `@csentence(2, 6)`,
        createBy: `@csentence(2, 6)`,
        createTime: `@date()`,
        filePath: '@url()'
      }]
    }
  })
})

Mock.mock(new RegExp(`${HTTP_ROOT}/${FETCH_TASK_ERRS}`), 'get', () => {
  return Mock.mock({
    code: 200,
    ok: true,
    data: {
      total: 100,
      'pageData|10-15': [{
        rowNum: '@integer(1, 20000)',
        error: '@csentence(10, 20)',
        'cellErrors|5-10': [{
          cellTitle: '@cword(2, 4)',
          columnIndex: '@integer(0, 50)',
          error: '@csentence(10, 20)'
        }]
      }]
    }
  })
})
