import { PageRouterSwitchProgress, AsyncLoadComponent, ReMountRouterComponent } from '@/components/higer-components'

const wrapperComponent = Component => (
  ReMountRouterComponent(PageRouterSwitchProgress(AsyncLoadComponent(Component)))
)

// 父路由组件
const RouteWrapper = wrapperComponent(() => import('@/components/common/RouteWrapper'))

// 我的案件
const MyCase =wrapperComponent(() => import('@/containers/MyCase'))

// 案件管理
const CaseManage = wrapperComponent(() => import('@/containers/CaseManage'))

// 任务管理
const TaskManage = wrapperComponent(() => import('@/containers/TaskManage'))

// 系统设置
const TrustorManage = wrapperComponent(() => import('@/containers/system-setting/TrustorManage'))
const PasswordSetting = wrapperComponent(() => import('@/containers/system-setting/PasswordSetting'))
const UserManage = wrapperComponent(() => import('@/containers/system-setting/UserManage'))
const DepartmentManage = wrapperComponent(() => import('@/containers/system-setting/DepartmentManage'))

const routerFactory = () => ({
  path: '/',
  children: [
    {
      path: '/my-case',
      title: '我的案件',
      code: '21000',
      component: MyCase
    },
    {
      path: '/case-manage',
      title: '案件管理',
      code: '22000',
      component: CaseManage
    },
    {
      path: '/task-manage',
      title: '任务管理',
      code: '24000',
      component: TaskManage
    },
    {
      path: '/system-setting',
      title: '系统设置',
      code: '23000',
      component: RouteWrapper,
      children: [
        {
          path: '/system-setting/trustor-manage',
          title: '委托方管理',
          code: '23500',
          component: TrustorManage
        },
        {
          path: '/system-setting/password-setting',
          title: '密码设置',
          code: '23400',
          component: PasswordSetting
        },
        {
          path: '/system-setting/user-manage',
          title: '人员管理',
          code: '23200',
          component: UserManage
        },
        {
          path: '/system-setting/department-manage',
          title: '部门管理',
          code: '23300',
          component: DepartmentManage
        }
      ]
    }
  ]
})

export default routerFactory