import React from 'react'
import Modal from '@salesforce/design-system-react/lib/components/modal'
import { connect } from 'formik'

const FormModal = ({formik: {resetForm}, onRequestClose = () => {}, children, ...props}) => <Modal
  onRequestClose={() => {
    resetForm()
    onRequestClose()
  }}
  {...props}
>
  {children}
</Modal>

export default connect(FormModal)