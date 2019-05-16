import React from 'react'
import PropTypes from 'prop-types'
import Input from '@salesforce/design-system-react/lib/components/input'
import FieldValue from '../value'

const TextFilter = ({property, label, ...props}) => <FieldValue property={property} label={label}>{
  ({filter: {id, value}, setPredicate, setFilterValue}) => <Input {...props}
                                                                  label="Value"
                                                                  onChange={({target: {value}}) => {
                                                                    setFilterValue(id, value)
                                                                    setPredicate(`contains ${value}`)
                                                                  }}
                                                                  value={value || ''}
  />
}</FieldValue>

TextFilter.buildFieldPredicate = field => !!field.value && field.value.length > 0 && `contains ${field.value}` || `is empty`

TextFilter.propTypes = {
  property: PropTypes.string.isRequired,
  label: PropTypes.string,
}

TextFilter.displayName = 'TextFilter'

export default TextFilter