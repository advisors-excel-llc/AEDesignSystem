import React from 'react'
import PropTypes from 'prop-types'
import StateComboBox from '../combobox/states'
import Input from '../input'

const Address = props => {
  const {
    name,
    required = false,
    containerClassName = '',
    fieldClassName = 'slds-p-around-small',
    streetFieldName = 'street',
    streetLabel = 'Street Address',
    cityFieldName = 'city',
    cityLabel = 'City',
    stateFieldName = 'state',
    stateLabel = 'State',
    postalCodeFieldName = 'postalCode',
    postalCodeLabel = 'Postal Code'
  } = props
  const sharedProps = {};

  if (required) {
    sharedProps.required = true;
  }

  return <div className={containerClassName}>
    <div className={`${fieldClassName} ${name}-${streetFieldName}`}>
      <Input name={`${name}.${streetFieldName}`} label={streetLabel} {...sharedProps}/>
    </div>
    <div className={`${fieldClassName} ${name}-${cityFieldName}`}>
      <Input name={`${name}.${cityFieldName}`} label={cityLabel} {...sharedProps}/>
    </div>
    <div className="slds-grid">
      <div className={`slds-grow ${fieldClassName} ${name}-${stateFieldName}`}>
        <StateComboBox name={`${name}.${stateFieldName}`}
                       label={stateLabel}
                       variant="inline-listbox"
                       {...sharedProps}
        />
      </div>
      <div className={`${fieldClassName} ${name}-${postalCodeFieldName}`}>
        <Input name={`${name}.${postalCodeFieldName}`} label={postalCodeLabel} modelMask='*****-0000' {...sharedProps}/>
      </div>
    </div>
  </div>
}

Address.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  containerClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  streetFieldName: PropTypes.string,
  streetLabel: PropTypes.string,
  cityFieldName: PropTypes.string,
  cityLabel: PropTypes.string,
  stateFieldName: PropTypes.string,
  stateLabel: PropTypes.string,
  postalCodeFieldName: PropTypes.string,
  postalCodeLabel: PropTypes.string,
}

export default Address;