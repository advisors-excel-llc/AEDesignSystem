import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Formik, Form, getIn} from 'formik'
import * as Yup from 'yup'
import Checkbox from '../'
import SLDSCheckbox from '@salesforce/design-system-react/lib/components/checkbox'

configure({adapter: new Adapter()})

describe('Checkbox', function () {
  it('should change the form state', function () {
    const form = mount(<Formik initialValues={{
      test: "No"
    }}>
      <Checkbox name="test" trueValue="Yes" falseValue="No"/>
    </Formik>)

    const chx = form.find(Checkbox).find('input')
    chx.simulate('change')
    expect(getIn(form.state('values'), 'test')).toBe('Yes')
    chx.simulate('change')
    expect(getIn(form.state('values'), 'test')).toBe('No')
  })

  it('should show error text when invalid', async function () {
    const form = mount(<Formik validationSchema={Yup.object({
      test: Yup.boolean().oneOf([true], 'Invalid checkbox')
    })}
                               initialValues={{
                                 test: false
                               }}
    >
      <Form>
        <Checkbox name="test"/>
      </Form>
    </Formik>)

    await form.instance().submitForm()
    form.update()

    expect(getIn(form.state('errors'), 'test')).toBe('Invalid checkbox')
    expect(getIn(form.find(SLDSCheckbox).prop('errorText'))).toBe('Invalid checkbox')
  })
})