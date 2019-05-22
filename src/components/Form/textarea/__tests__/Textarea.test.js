import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Formik, getIn } from 'formik'
import * as Yup from 'yup'
import Textarea from '../'
import SLDSTextArea from '@salesforce/design-system-react/lib/components/textarea'

configure({adapter: new Adapter()})

describe('Textarea', function () {
  it('should change the form state', function () {
    const form = mount(<Formik initialValues={{
      test: 'Default'
    }}>
      <Textarea name="test"/>
    </Formik>)

    form.find('textarea').simulate('change', {target: {value: 'Testign'}})
    expect(getIn(form.state('values'), 'test')).toBe('Testign')
  })

  it('should display error text when invalid', async function () {
    const form = mount(<Formik initialValues={{
      test: ''
    }}
                               validationSchema={Yup.object({
                                 test: Yup.string().required('Test is required')
                               })}
    >
      <Textarea name="test"/>
    </Formik>)

    await form.instance().submitForm()
    form.update()

    expect(getIn(form.state('errors'), 'test')).toBe('Test is required')
    expect(form.find(SLDSTextArea).prop('errorText')).toBe('Test is required')
  })
})