import React from 'react'
import PropTypes from 'prop-types'
import { Consumer } from '../field/context'

const FilterValue = props => <Consumer>{
  context => {
    const {filter} = context
    const {children, property, ...rest} = props
    if (!property) return null

    if (!filter || !property || property !== filter.property) return null

    return !!children && children({...rest, property, ...context})
  }}
</Consumer>

FilterValue.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.func.isRequired,
}

FilterValue.displayName = 'FilterValue'

FilterValue.buildFieldPredicate = field => !!field && !!field.value && `is ${field.value}` || 'is empty'

export default FilterValue