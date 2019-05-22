import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Formik } from 'formik'
import Modal from '../'
import SLDSModal from '@salesforce/design-system-react/lib/components/modal'
import sinon from 'sinon'
import { wait } from '../../../../__tests__/util'

configure({adapter: new Adapter()})

describe('Modal', function () {
  it('should close and reset the form', async function () {
    const onReset = sinon.spy()
    const form = mount(<Formik onReset={onReset}>
      <Modal isOpen={true}>
        <p>Child content</p>
      </Modal>
    </Formik>)

    const modal = form.find(Modal)
    expect(modal.find('p').text()).toBe('Child content')

    modal.find(SLDSModal).instance().closeModal()

    await wait(100)

    expect(onReset.callCount).toBe(1)
  })
})