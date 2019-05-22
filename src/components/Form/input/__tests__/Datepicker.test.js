import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Formik, Form, getIn } from 'formik'
import * as Yup from 'yup'
import DatePicker from '../datepicker'
import SLDSDatePicker from '@salesforce/design-system-react/lib/components/date-picker'
import sinon from 'sinon'

configure({adapter: new Adapter()})

describe('DatePicker', function () {
  it('should update the state with valid date format', function () {
    const form = mount(<Formik>
      <DatePicker name="test"/>
    </Formik>)

    const input = form.find(DatePicker).find('input')
    input.simulate('change', {target: {value: '05/22/2019'}})

    expect(getIn(form.state('values'), 'test')).toBe('2019-05-22T00:00:00-04:00')
  })

  it('should show error text when invalid', async function () {
    const onSubmit = sinon.spy()
    const form = mount(<Formik
      initialValues={{
        test: '123'
      }}
      validationSchema={Yup.object({
      test: Yup.string().max(2, 'Invalid date')
    })}
                               onSubmit={onSubmit}
    >
      <Form>
        <DatePicker name="test"/>
      </Form>
    </Formik>)

    await form.instance().submitForm()
    form.update()

    expect(onSubmit.callCount).toBe(0)
    expect(getIn(form.state('errors'), 'test')).toBe('Invalid date')
    expect(form.find(SLDSDatePicker).prop('errorText')).toBe('Invalid date')
  })
})