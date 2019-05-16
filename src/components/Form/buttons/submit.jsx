import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import Button from '@salesforce/design-system-react/lib/components/button'

const Submit = ({label, variant = 'base', formik, ...props}) => <Button
  {...props}
  type="button"
  label={label}
  variant={variant}
  onClick={e => formik.handleSubmit(e)}
/>

Submit.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
}

export default connect(Submit)