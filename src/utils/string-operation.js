/**
 * 获取url中的路径
 */

const getPathFromUrl = url => url.replace(/^.*?\:\/\/[^\/]+/, '')

export {
  getPathFromUrl
}