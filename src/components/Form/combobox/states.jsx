import React from 'react'
import ComboBox from './index'
import { connect } from 'formik'
import states from './presets/states'

const StateComboBox = props => <ComboBox {...props}
                                         options={states}
                                         selectAll={true}
                                         clearAll={true}
                                         selectAllLabel="Select All States"
                                         clearAllLabel="Clear All States"
/>

StateComboBox.propTypes = {
  ...ComboBox.propTypes
}

export default connect(StateComboBox)