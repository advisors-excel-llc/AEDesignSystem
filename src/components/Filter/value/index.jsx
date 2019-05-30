import React from 'react'
import PropTypes from 'prop-types'

const FilterValue = props => {
  const {filter, children, property, ...rest} = props
  if (!property) return null

  if (!filter || !property || property !== filter.property) return null

  return !!children && children({...rest, property, filter})
}

FilterValue.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.func.isRequired,
}

FilterValue.displayName = 'FilterValue'

FilterValue.buildFieldPredicate = field => !!field && !!field.value && `is ${field.value}` || 'is empty'

export default FilterValue