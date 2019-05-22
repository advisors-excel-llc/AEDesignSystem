import React from 'react'
import PropTypes from 'prop-types'
import { FastField, getIn } from 'formik'
import Checkbox from '@salesforce/design-system-react/lib/components/checkbox'

const CheckboxGroup = props => <FastField {...props}>
  {({form, field}) => {
    const {name, value = []} = field
    const {options = [], label, required = false} = props
    const {touched, errors, setFieldValue} = form
    const error = getIn(touched, name) && getIn(errors, name) || null

    return <div className={`slds-form-element ${!!error && 'slds-has-error'}`}>
      {!!label && <div className="slds-form-element__label_edit">
        {required && <abbr className="slds-required" title="required">*</abbr>}
        {label}
      </div>}
      {options.map(o => typeof o === 'string' ? {id: o, label: o, value: o} : o)
        .map(option => <Checkbox name={`name[${option.id}]`}
                                 checked={value.includes(option.value)}
                                 onChange={(e, {checked}) => {
                                   setFieldValue(name, checked ? [].concat(value, [option.value]) : value.filter(v => v !== option.value))
                                 }}
                                 labels={{
                                  label: option.label || option.value
                                 }}
                                 key={`name-${option.id}`}

        />)
      }
      {!!error && <div className="slds-form-element__help">{error}</div>}
    </div>
  }}
</FastField>

CheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.any,
        label: PropTypes.string,
        value: PropTypes.string.isRequired
      }),
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]
  )).isRequired
}

export default CheckboxGroup