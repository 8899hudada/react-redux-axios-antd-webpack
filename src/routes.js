import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'

const RouteWrapper = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/components/common/RouteWrapper')))

// 首页
// 我的案件
const MyCase = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/MyCase')))

// 案件管理
const CaseManage = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/CaseManage')))

// 系统设置
const TrustorManage = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/system-setting/TrustorManage')))
const PasswordSetting = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/system-setting/PasswordSetting')))
const UserManage = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/system-setting/UserManage')))
const DepartmentManage = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/system-setting/DepartmentManage')))

const routes = [
  {
    path: '/my-case',
    title: '我的案件',
    component: MyCase
  },
  {
    path: '/case-manage',
    title: '案件管理',
    component: CaseManage
  },
  {
    path: '/system-setting',
    title: '系统设置',
    component: RouteWrapper,
    children: [
      {
        path: '/system-setting/trustor-manage',
        title: '委托方管理',
        component: TrustorManage
      },
      {
        path: '/system-setting/password-setting',
        title: '密码设置',
        component: PasswordSetting
      },
      {
        path: '/system-setting/user-manage',
        title: '人员管理',
        component: UserManage
      },
      {
        path: '/system-setting/department-manage',
        title: '部门管理',
        component: DepartmentManage
      }
    ]
  }
]

export default routes