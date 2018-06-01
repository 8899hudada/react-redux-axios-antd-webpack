import React from 'react'
import { Select, Spin } from 'antd'
import PropTypes from 'prop-types'
import { debounce } from '@utils'

const Option = Select.Option

class RemoteSelect extends React.PureComponent {
  static propTypes = {
    remoteMethod: PropTypes.func.isRequired,
    searchKey: PropTypes.string,
    option: PropTypes.shape({
      valueKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      labelKey: PropTypes.string
    }),
    placeholder: PropTypes.string,
    onChange: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: false
    }
    this.fetchData = debounce(this.fetchData.bind(this))
  }
  fetchData (searchText = '') {
    const { remoteMethod, searchKey } = this.props
    this.setState({ loading: true })
    remoteMethod({
      [searchKey]: searchText
    }).then(({ data }) => {
      this.setState({
        data: data.pageData
      })
    }).finally(() => this.setState({ loading: false }))
  }
  render () {
    const { data, loading } = this.state
    const { option, onChange, placeholder } = this.props
    return (
      <Select
        placeholder={placeholder}
        filterOption={false}
        onSearch={this.fetchData}
        onFocus={this.fetchData}
        onChange={onChange}
        notFoundContent={loading ? <Spin size="small" /> : null}
        showSearch>
        { data.map(item => <Option key={item[option.valueKey]}>{item[option.labelKey]}</Option>) }
      </Select>
    )
  }
}

RemoteSelect.defaultProps = {
  searchKey: 'name',
  option: {
    valueKey: 'id',
    labelKey: 'name'
  },
  placeholder: ''
}

export default RemoteSelect