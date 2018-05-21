export const getFirstLevelRoute = (path, routes = []) => {
  function recursion (path, routes = [], firstLevelRoute) {
    return routes.find(route => {
      if (route.path === path) {
        return firstLevelRoute || route
      }

      return recursion(path, route.children, firstLevelRoute || route)
    })
  }

  return recursion(path, routes)
}