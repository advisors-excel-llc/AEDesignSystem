import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Formik, getIn } from 'formik'
import * as Yup from 'yup'
import ComboBox from '../'
import SLDSComboBox from '@salesforce/design-system-react/lib/components/combobox'
import Option from '../option'

configure({adapter: new Adapter()})

describe('ComboBox', function () {
  it('should change form state with single value', function () {
    const form = mount(<Formik>
      <ComboBox name="test" options={["One", "Two", "Three"]}/>
    </Formik>)

    form.find('input').simulate('click')
    form.find('span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toBe('One')
  })

  it('should change form state with single value using option', function () {
    const form = mount(<Formik>
      <ComboBox name="test">
        <Option id="One" value="One" label="One" />
        <Option id="Two" value="Two" label="Two" />
        <Option id="Three" value="Three" label="Three" />
      </ComboBox>
    </Formik>)

    form.find('input').simulate('click')
    form.find('span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toBe('One')
  })

  it('should change form state with multiple values', function () {
    const form = mount(<Formik>
      <ComboBox name="test" options={["One", "Two", "Three"]} multiple/>
    </Formik>)

    form.find('input').simulate('click')
    form.find('span.slds-listbox__option').at(0).simulate('click')
    form.find('input').simulate('click')
    form.find('span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toEqual(['One', 'Two'])
  })

  it('should change form state with multiple values using option', function () {
    const form = mount(<Formik>
      <ComboBox name="test" multiple>
        <Option id="One" value="One" label="One" />
        <Option id="Two" value="Two" label="Two" />
        <Option id="Three" value="Three" label="Three" />
      </ComboBox>
    </Formik>)

    form.find('input').simulate('click')
    form.find('span.slds-listbox__option').at(0).simulate('click')
    form.find('input').simulate('click')
    form.find('span.slds-listbox__option').at(0).simulate('click')

    expect(getIn(form.state('values'), 'test')).toEqual(['One', 'Two'])
  })

  it('should show error message when invalid', async function () {
    const form = mount(<Formik validationSchema={Yup.object({
      test: Yup.array().required('Test is required')
    })}>
      <ComboBox name="test" options={["One", "Two", "Three"]} multiple/>
    </Formik>)

    await form.instance().submitForm()
    form.update()

    expect(getIn(form.state('errors'), 'test')).toBe('Test is required')
    expect(form.find(SLDSComboBox).prop('errorText')).toBe('Test is required')
  })
})