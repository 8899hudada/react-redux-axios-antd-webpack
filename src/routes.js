import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/higer-components'

const RouteWrapper = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/components/common/RouteWrapper')))

// 首页
const Home = PageRouterSwitchProgress(AsyncLoadComponent(() => import('@/containers/home/Home')))

const routes = [
  {
    path: '/',
    component: RouteWrapper,
    title: '首页',
    children: [
      {
        path: '/home',
        component: Home,
        title: '首页'
      }
    ]
  }
]

export default routes