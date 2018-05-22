import React from 'react'
import PropTypes from 'prop-types'

const CompanyInfo = ({ className, companyAvator }) => {
  return (
    <div className={className}>
      <img className="avator" src={companyAvator} alt=""/>
      <span>律所案件系统</span>
    </div>
  )
}

CompanyInfo.propTypes = {
  className: PropTypes.string,
  companyAvator: PropTypes.string
}

export default CompanyInfo