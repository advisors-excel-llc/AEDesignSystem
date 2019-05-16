import React from 'react'
import PropTypes from 'prop-types'
import { FastField, getIn } from 'formik'
import SFCheckbox from '@salesforce/design-system-react/lib/components/checkbox'

const Checkbox = (props) => <FastField {...props}>
  {({form, field}) => {
    const {trueValue = true, falseValue = false, onChange = () => {}} = props
    const {name, value} = field
    const {setFieldValue, errors, submitCount, handleBlur} = form
    const touched = getIn(form.touched, name)
    const error = (touched || submitCount > 0) && getIn(errors, name)

    return <SFCheckbox {...props}
                       errorText={error}
                       checked={value === trueValue}
                       onChange={(e, {checked}) => {
                         const value = checked ? trueValue : falseValue
                         setFieldValue(name, value)
                         onChange(e, {checked, value})
                       }}
                       onBlur={handleBlur}
    />
  }}
</FastField>

const {checked = null, defaultChecked = null, errorText = null, ...rest} = SFCheckbox.propTypes

Checkbox.propTypes = {
  ...rest,
  name: PropTypes.string.isRequired,
  trueValue: PropTypes.any,
  falseValue: PropTypes.any,
  onChange: PropTypes.func,
}

export default Checkbox