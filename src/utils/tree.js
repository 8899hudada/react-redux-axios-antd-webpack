const findNodeInTree = (tree, options) => {
  const len = tree.length

  options.key = options.key || 'id'
  options.value = options.value || ''
  
  for (let i = 0; i < len; i++) {
    let node = tree[i]
    
    if (options.value === node[options.key]) {
      return node
    }

    if (node.children && node.children.length) {
      let returnNode = findNodeInTree(node.children, options)

      if (returnNode) {
        return returnNode
      }
    }
  }

  return null
}

export {
  findNodeInTree
}