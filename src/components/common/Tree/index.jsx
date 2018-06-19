import React from 'react'
import { Tree as AntdTree, Input } from 'antd'
import PropTypes from 'prop-types'
import style from './style'

const TreeNode = AntdTree.TreeNode
const Search = Input.Search

class Tree extends React.PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    selectedKeys: PropTypes.array,
    onSelect: PropTypes.func,
    checkedKeys: PropTypes.array,
    onCheck: PropTypes.func,
    option: PropTypes.shape({
      labelKey: PropTypes.string,
      valueKey: PropTypes.string,
      childrenKey: PropTypes.string,
    }),
    placeholder: PropTypes.string,
    isSearch: PropTypes.bool,
    checkable: PropTypes.bool,
    NodeTitle: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      searchValue: '',
      expandedKeys: [],
      autoExpandParent: true
    }
    this.searchChange = this.searchChange.bind(this)
    this.renderTreeNodes = this.renderTreeNodes.bind(this)
    this.onExpand = this.onExpand.bind(this)
    this.searchChange = this.searchChange.bind(this)
    this.getParentKey = this.getParentKey.bind(this)
    this.generateList = this.generateList.bind(this)
  }
  searchChange (event) {
    const searchValue = event.target.value
    const { data, option } = this.props
    const { labelKey, valueKey } = option
    const expandedKeys = this.generateList(data).map(item => {
      if (item[labelKey].includes(searchValue) && searchValue) {
        return this.getParentKey(item[valueKey], data)
      }
      return null
    }).filter((item, i, self) => item && self.indexOf(item) === i)
    this.setState({
      searchValue,
      expandedKeys,
      autoExpandParent: true
    })
  }
  onExpand (expandedKeys) {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }
  getParentKey (value, tree) {
    let parentKey
    const { valueKey, childrenKey } = this.props.option
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node[childrenKey]) {
        if (node[childrenKey].some(item => item[valueKey] === value)) {
          parentKey = node[valueKey]
        } else if (this.getParentKey(value, node[childrenKey])) {
          parentKey = this.getParentKey(value, node[childrenKey])
        }
      }
    }
    return parentKey
  }
  generateList = data => {
    let dataList = []
    const { valueKey, childrenKey, labelKey } = this.props.option
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const value = node[valueKey]
      const label = node[labelKey]
      const children = node[childrenKey]
      dataList.push({ [valueKey]: value, [labelKey]: label })
      if (children) {
        dataList.push(...this.generateList(children))
      }
    }
    return dataList
  }
  renderTreeNodes (data) {
    const searchValue = this.state.searchValue
    const { labelKey, valueKey, childrenKey } = this.props.option
    const { checkable, NodeTitle } = this.props
    return data.map(item => {
      const index = item[labelKey].indexOf(searchValue)
      const beforeStr = item[labelKey].substr(0, index)
      const afterStr = item[labelKey].substr(index + searchValue.length)
      const title = NodeTitle ? (
        <NodeTitle {...item}></NodeTitle>
      ) : index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item[labelKey]}</span>
      )

      if (checkable) {
        if (item[childrenKey] && item[childrenKey].length) {
          return <TreeNode title={title} key={item[valueKey]} dataRef={item} selectable={false}>
            {this.renderTreeNodes(item[childrenKey])}
          </TreeNode>
        }
        return <TreeNode title={title} key={item[valueKey]} dataRef={item} selectable={false} />
      } else {
        if (item[childrenKey] && item[childrenKey].length) {
          return (
            <TreeNode
              className={`${style['tree-select']} ${NodeTitle ? style['customer-node'] : ''}`}
              title={title}
              key={item[valueKey]}
              dataRef={item}
              selectable={false}>
              {this.renderTreeNodes(item[childrenKey])}
            </TreeNode>
          ) 
        }

        return (
          <TreeNode
            title={title}
            key={item[valueKey]}
            dataRef={item} />
        )
      }
    })
  }
  render () {
    const { searchValue, expandedKeys, autoExpandParent } = this.state
    const { data, placeholder, isSearch } = this.props

    return (
      <div>
        {
          isSearch ? (
            <Search
              value={searchValue}
              onChange={this.searchChange}
              placeholder={placeholder} />
          ) : null
        }
        <AntdTree
          {...this.props}
          autoExpandParent={autoExpandParent}
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}>
          {this.renderTreeNodes(data)}
        </AntdTree>
      </div>
    )
  }
}

Tree.defaultProps = {
  option: {
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children'
  },
  placeholder: '',
  selectedKeys: [],
  onSelect: () => {},
  checkedKeys: [],
  onCheck: () => {},
  isSearch: false,
  checkable: false
}

export default Tree