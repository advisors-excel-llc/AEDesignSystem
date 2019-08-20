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

    form.find('div.test-street input').simulate('change', {target: {value: 'Test Street', name: 'test.street'}})
    form.find('div.test-city input').simulate('change', {target: {value: 'Testville', name: 'test.city'}})
    form.find('div.test-postalCode input').simulate('change', {target: {value: '11122', name: 'test.postalCode'}})

    form.find('div.test-state input').simulate('click')
    form.find('div.test-state span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toEqual({
      city: 'Testville',
      postalCode: '11122',
      state: 'AL',
      street: 'Test Street',
    })
  })

  it('should support custom field names and labels', function () {
    const form = mount(<Formik>
      <Address name="test"
               streetFieldName="billingStreet"
               streetLabel="Billing Street"
               cityFieldName="billingCity"
               cityLabel="Billing City"
               stateFieldName="billingState"
               stateLabel="Billing State"
               postalCodeFieldName="billingPostalCode"
               postalCodeLabel="Billing Postal Code"
      />
    </Formik>)

    form.find('div.test-billingStreet input').simulate('change', {target: {value: 'Test Street', name: 'test.billingStreet'}})
    form.find('div.test-billingCity input').simulate('change', {target: {value: 'Testville', name: 'test.billingCity'}})
    form.find('div.test-billingPostalCode input').simulate('change', {target: {value: '11122', name: 'test.billingPostalCode'}})

    form.find('div.test-billingState input').simulate('click')
    form.find('div.test-billingState span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toEqual({
      billingCity: 'Testville',
      billingPostalCode: '11122',
      billingState: 'AL',
      billingStreet: 'Test Street',
    })
    expect(form.find('div.test-billingStreet label').text()).toBe('Billing Street')
    expect(form.find('div.test-billingCity label').text()).toBe('Billing City')
    expect(form.find('div.test-billingState label').text()).toBe('Billing State')
    expect(form.find('div.test-billingPostalCode label').text()).toBe('Billing Postal Code')
  })
})