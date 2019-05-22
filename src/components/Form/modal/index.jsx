import React from 'react'
import Modal from '@salesforce/design-system-react/lib/components/modal'
import { connect } from 'formik'

const FormModal = ({formik: {handleReset}, onRequestClose = () => {}, children, ...props}) => <Modal
  onRequestClose={() => {
    handleReset()
    onRequestClose()
  }}
  {...props}
>
  {children}
</Modal>

export default connect(FormModal)