import React from 'react'
import PropTypes from 'prop-types'
import Input from '@salesforce/design-system-react/lib/components/input'

const TextFilter = ({property, label, filter, setPredicate, setFilterValue, ...props}) =>
  !!filter && <Input {...props}
         label="Value"
         onChange={({target: {value}}) => {
           setFilterValue(filter.id, value)
           setPredicate(`contains ${value}`)
         }}
         value={!!filter.value && filter.value || ''}
  />

TextFilter.buildFieldPredicate = field => !!field.value && field.value.length > 0 && `contains ${field.value}` || `is empty`

TextFilter.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string,
}

TextFilter.displayName = 'TextFilter'

export default TextFilter