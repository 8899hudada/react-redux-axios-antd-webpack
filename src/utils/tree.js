import { isObject, isArray } from './judge-type'

/**
 * 遍历树
 * @param  {Object || Array} tree 树
 * @param  {Function} condition 条件函数
 * @param  {Function} matchCallback 满足条件的回掉函数
 * @param  {Function} mismatchCallback 不满足条件的回掉函数
 * @return {undefined} undefined
 */
const traversalTree = (tree, conditionFn = () => {}, matchCallback = () => {}, mismatchCallback = () => {}) => {
  if (isObject(tree)) {
    if (conditionFn(tree)) {
      matchCallback(tree)
    } else {
      mismatchCallback(tree)
    }

    if (tree.children && tree.children.length) {
      traversalTree(tree.children, conditionFn, matchCallback, mismatchCallback)
    }
  } else if (isArray(tree)) {
    tree.forEach(node => {
      traversalTree(node, conditionFn, matchCallback, mismatchCallback)
    })
  }
}

export {
  traversalTree
}
