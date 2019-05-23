import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Formik, getIn } from 'formik'
import Address from '../'

configure({adapter: new Adapter()})

describe('Address', function () {
  it('should update the form state', function () {
    const form = mount(<Formik>
      <Address name="test"/>
    </Formik>)

    form.find('div.test-street input').simulate('change', {target: {value: 'Test Street'}})
    form.find('div.test-city input').simulate('change', {target: {value: 'Testville'}})
    form.find('div.test-postal-code input').simulate('change', {target: {value: '11122'}})

    form.find('div.test-state input').simulate('click')
    form.find('div.test-state span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toEqual({
      city: 'Testville',
      postalCode: '11122',
      state: 'AL',
      street: 'Test Street',
    })
  })
})