import React from 'react'
import PropTypes from 'prop-types'
import { getIn, FastField, Field } from 'formik'
import SFInput from '@salesforce/design-system-react/lib/components/input'
import mask from './mask'

const render = ({form, field}) => {
  const {name, value = ''} = field
  const touched = getIn(form.touched, name)
  const error = (touched || form.submitCount > 0) && getIn(form.errors, name)
  const {modelMask, viewMask, onChange, onBlur, ...compProps} = props
  const compValue = !!viewMask ? mask(viewMask, value) : value
  return <SFInput {...compProps}
                  {...field}
                  errorText={error || ''}
                  onChange={e => {
                    onChange(e, {form, field, value: e.target.value, error})
                    const newval = !!e.detail && e.detail.hasOwnProperty('value') ? e.detail.value : e.target.value
                    const value = !!modelMask ? mask(modelMask, newval) : newval
                    field.onChange(e)
                    if (value != e.target.value) {
                      form.setFieldValue(name, value || '')
                    }
                  }}
                  onBlur={e => {
                    onBlur(e, {form, field, value: e.target.value, error})
                    field.onBlur(e)
                  }}
                  value={compValue}
  />
};

const Input = (props) => props.fastField
  ? <FastField {...props}>
  {render}
</FastField>
  : <Field>
    {render}
  </Field>

Input.propTypes = {
  fastField : PropTypes.bool, //Choose between a field and a fast field.  See Formik docs for more.
  onChange : PropTypes.func,
  onBlur: PropTypes.func,
}

Input.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
}

export default Input
