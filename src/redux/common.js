import { createReducer } from '@/utils/redux'
import {
  UPDATE_LOADING,
  UPDATE_ACTIVE_FIRST_LEVEL_ROUTE
} from '@/constants/action-name'

function stateFactory () {
  return {
    loading: false, // 全局loading图标
    activeFirstLevelRoute: null // 激活状态的第一級路由
  }
}

// action
export const updateLoadingAction = (loading = false) => {
  return {
    type: UPDATE_LOADING,
    payload: loading
  }
}

export const updateActiveFirstLevelRouteAction = (activeFirstLevelRoute = null) => {
  return {
    type: UPDATE_ACTIVE_FIRST_LEVEL_ROUTE,
    payload: activeFirstLevelRoute
  } 
}

// reducer

function updateLoading (state, action) {
  return {
    ...state,
    loading: action.payload
  }
}

function updateActiveFirstLevelRoute (state, action) {
  return {
    ...state,
    activeFirstLevelRoute: action.payload 
  }
}

export const commonReducer = createReducer(stateFactory(), {
  [UPDATE_LOADING]: updateLoading,
  [UPDATE_ACTIVE_FIRST_LEVEL_ROUTE]: updateActiveFirstLevelRoute,
})