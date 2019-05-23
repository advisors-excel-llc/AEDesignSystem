import React from 'react'
import PropTypes from 'prop-types'
import StateComboBox from '../combobox/states'
import Input from '../input'

const Address = ({name, required = false}) => {
  const sharedProps = {};

  if (required) {
    sharedProps.required = true;
  }

  return <div>
    <div className={`slds-p-around--small ${name}-street`}>
      <Input name={`${name}.street`} label="Street Address" {...sharedProps}/>
    </div>
    <div className={`slds-p-around--small ${name}-city`}>
      <Input name={`${name}.city`} label="City" {...sharedProps}/>
    </div>
    <div className="slds-grid">
      <div className={`slds-grow slds-p-around--small ${name}-state`}>
        <StateComboBox name={`${name}.state`}
                       label="State"
                       variant="inline-listbox"
                       {...sharedProps}
        />
      </div>
      <div className={`slds-p-around--small ${name}-postal-code`}>
        <Input name={`${name}.postalCode`} label="Postal Code" modelMask='*****-0000' {...sharedProps}/>
      </div>
    </div>
  </div>
}

Address.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool
}

export default Address;