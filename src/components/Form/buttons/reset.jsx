import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import Button from '@salesforce/design-system-react/lib/components/button'

const Reset = ({label, variant = 'neutral', formik: {resetForm}, onClick = () => {}, ...props}) => <Button
  {...props}
  type="button"
  label={label}
  variant={variant}
  onClick={e => {
    resetForm()
    onClick(e)
  }}
/>

Reset.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
}

export default connect(Reset)