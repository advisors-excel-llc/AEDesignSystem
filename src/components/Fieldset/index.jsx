import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const Fieldset = ({label, children}) => <fieldset className="ae-fieldset">
  {!!label && <legend>{label}</legend>}
  {children}
</fieldset>

Fieldset.propTypes = {
  label: PropTypes.string,
}

export default Fieldset