import { createReducer } from '@/utils/redux'
import {
  UPDATE_LOADING,
  UPDATE_ROUTER_MENU
} from '@/constants/action-name'

function stateFactory () {
  return {
    loading: false, // 全局loading图标
    openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
    selectedKeys: [] // 当前选中的菜单项 key 数组
  }
}

// action
export const updateLoadingAction = (loading = false) => ({
  type: UPDATE_LOADING,
  payload: loading
})

export const updateRouterMenuAction = (openKeys = [], selectedKeys = []) => ({
  type: UPDATE_ROUTER_MENU,
  payload: {
    openKeys,
    selectedKeys
  }
})

// reducer
const loadingReducer = (state, action) => ({
  ...state,
  loading: action.payload
})

const routerMenuReducer = (state, action) => ({
  ...state,
  ...action.payload
})

export const commonReducer = createReducer(stateFactory(), {
  [UPDATE_LOADING]: loadingReducer,
  [UPDATE_ROUTER_MENU]: routerMenuReducer
})