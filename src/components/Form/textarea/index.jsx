import React from 'react'
import PropTypes from 'prop-types'
import {FastField, getIn} from 'formik'
import SFTextArea from '@salesforce/design-system-react/lib/components/textarea'

const TextArea = props => <FastField {...props}>
  {({form, field}) => {
    const {value, name} = field
    const {touched, errors, setFieldValue, setFieldTouched} = form
    const isTouched = getIn(touched, name)
    const error = isTouched && getIn(errors, name) || ''
    const {onChange = () => {}, ...compProps} = props

    return <SFTextArea {...compProps}
                       {...field}
                       errorText={error}
                       value={value}
                       onChange={e => {
                         onChange(e, {form, field, value: e.target.value, error})
                         const newval = !!e.detail && e.detail.hasOwnProperty('value') ? e.detail.value : e.target.value
                         setFieldValue(name, newval || '')
                         setFieldTouched(name)
                       }}
    />
  }}
</FastField>

TextArea.propTypes = {
  ...SFTextArea.propTypes,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
}

export default TextArea