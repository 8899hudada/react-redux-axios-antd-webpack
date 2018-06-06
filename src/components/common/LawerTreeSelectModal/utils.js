const formatTreeData = data => {
  data.forEach(item => {
    if (item.children) {
      item.children.push(...item.users)
      formatTreeData(item.children)
    }
  })
  return data
}

export {
  formatTreeData
}