/**
 * 格式化后端返回的部门树
 * 将users并入children
 * 注意：user和department的id没有关联，所以可能会重复，需进行特殊处理
 */
const formatTreeData = data => {
  data.forEach(item => {
    if (item.children) {
      item.children.unshift(...item.users)
      formatTreeData(item.children)
    }
  })
  return data
}

export {
  formatTreeData
}