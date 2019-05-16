import React from 'react'
import PropTypes from 'prop-types'
import StateComboBox from '../combobox/states'
import Input from '../input'

const Address = ({model, required = false}) => {
  const sharedProps = {};

  if (required) {
    sharedProps.required = true;
  }

  return <div>
    <div className="slds-p-around--small">
      <Input name={`${model}.street`} label="Street Address" {...sharedProps}/>
    </div>
    <div className="slds-p-around--small">
      <Input name={`${model}.city`} label="City" {...sharedProps}/>
    </div>
    <div className="slds-grid">
      <div className="slds-grow slds-p-around--small">
        <StateComboBox name={`${model}.state`}
                       label="State"
                       variant="inline-listbox"
                       {...sharedProps}
        />
      </div>
      <div className="slds-p-around--small">
        <Input name={`${model}.postalCode`} label="Postal Code" modelMask='*****-0000' {...sharedProps}/>
      </div>
    </div>
  </div>
}

Address.propTypes = {
  model: PropTypes.string,
  required: PropTypes.bool
}

export default Address;