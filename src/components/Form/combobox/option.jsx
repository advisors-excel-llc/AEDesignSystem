import React from 'react'
import PropTypes from 'prop-types'

const Option = (props) => <React.Fragment {...props} />

Option.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  icon: PropTypes.any,
  type: PropTypes.string,
  onSelect: PropTypes.func,
  value: PropTypes.any,
  isMatch: PropTypes.func,
}

export default Option