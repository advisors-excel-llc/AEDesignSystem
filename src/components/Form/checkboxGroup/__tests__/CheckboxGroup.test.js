import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Formik, getIn} from 'formik'
import * as Yup from 'yup'
import CheckboxGroup from '../'

configure({adapter: new Adapter()})

describe('CheckboxGroup', function () {
  it('should change the form state', function () {
    const form = mount(<Formik initialValues={{
      test: []
    }}>
      <CheckboxGroup name="test" options={["One", "Two", "Three"]}/>
    </Formik>)

    form.find('input').at(0).simulate('change')
    expect(getIn(form.state('values'), 'test')).toEqual(["One"])
    form.find('input').at(1).simulate('change')
    expect(getIn(form.state('values'), 'test')).toEqual(["One", "Two"])
    form.find('input').at(0).simulate('change')
    form.find('input').at(2).simulate('change')
    expect(getIn(form.state('values'), 'test')).toEqual(["Two", "Three"])
  })

  it('should have error if invalid', async function () {
    const form = mount(<Formik validationSchema={
      Yup.object({
        test: Yup.array().required('Test is invalid')
      })
    }>
      <CheckboxGroup name="test" options={["One", "Two", "Three"]}/>
    </Formik>)

    form.find('input').at(0).simulate('change')
    form.find('input').at(0).simulate('change')

    await form.instance().submitForm()
    form.update()

    expect(getIn(form.state('errors'), 'test')).toBe('Test is invalid')
    expect(form.find('div.slds-form-element__help').text()).toBe('Test is invalid')
  })
})