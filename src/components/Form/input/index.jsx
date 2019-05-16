import React from 'react'
import { getIn, FastField } from 'formik'
import SFInput from '@salesforce/design-system-react/lib/components/input'
import mask from './mask'

const Input = (props) => <FastField {...props}>
  {({form, field}) => {
    const {name, value = ''} = field
    const touched = getIn(form.touched, name)
    const error = (touched || form.submitCount > 0) && getIn(form.errors, name)
    const {modelMask, viewMask, onChange = () => {}, ...compProps} = props
    const compValue = !!viewMask ? mask(viewMask, value) : value
    return <SFInput {...compProps}
                    {...field}
                    errorText={error || ''}
                    onChange={e => {
                      onChange(e, {form, field, value: e.target.value, error})
                      const newval = !!e.detail && e.detail.hasOwnProperty('value') ? e.detail.value : e.target.value
                      const value = !!modelMask ? mask(modelMask, newval) : newval
                      form.setFieldValue(name, value || '')
                      form.setFieldTouched(name)
                    }}
                    value={compValue}
    />
  }}
</FastField>

export default Input