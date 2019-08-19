import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Formik, Form, getIn} from 'formik'
import * as Yup from 'yup'
import Input from '../'
import SLDSInput from '@salesforce/design-system-react/lib/components/input'
import {wait} from '../../../../__tests__/util'

configure({adapter: new Adapter()})

describe('Input', function () {
  it('Should update the form state', function () {
    const form = mount(<Formik initialValues={{test: '123'}}>
      <Input name="test" modelMask="(000 " required/>
    </Formik>)

    expect(getIn(form.state('values'), 'test')).toBe('123')

    const input = form.find(Input).find('input')

    input.simulate('change', {target: {value: '321'}})

    expect(getIn(form.state('values'), 'test')).toBe('(321')
  })

  it('Should show error text when invalid', async function () {
    const form = mount(<Formik initialValues={{test: ''}} validationSchema={Yup.object({
      test: Yup.string().required('Test is required')
    })}>
      <Form>
        <Input name="test" required/>
      </Form>
    </Formik>)

    const input = form.find(Input).find('input')
    input.simulate('change', {target: {value: '', name: 'test'}})
    input.simulate('blur')
    // Validation is async and fires on blur
    await wait(10)
    form.update()

    expect(getIn(form.state('errors'), 'test')).toBe('Test is required')
    expect(form.find(SLDSInput).prop('errorText')).toBe('Test is required')
  })

  it('Should update the form state with masked value', function () {
    const form = mount(<Formik initialValues={{test: 'default'}}>
      <Input name="test" modelMask="(000) 000-0000" required/>
    </Formik>)

    // this is still default because the initial value to the state is default, the masker didn't act on it
    expect(getIn(form.state('values'), 'test')).toBe('default')

    const input = form.find(Input).find('input')

    input.simulate('change', {target: {value: '5551111212'}})

    expect(getIn(form.state('values'), 'test')).toBe('(555) 111-1212')
  })

  it('Should update the form state without masked value but mask the view', function () {
    const form = mount(<Formik initialValues={{test: 'default'}}>
      <Input name="test" viewMask="(000) 000-0000" required/>
    </Formik>)

    // this is still default because the initial value to the state is default, the masker didn't act on it
    expect(getIn(form.state('values'), 'test')).toBe('default')

    const input = form.find(Input).find('input')

    input.simulate('change', {target: {value: '5551111212', name: 'test'}})

    expect(getIn(form.state('values'), 'test')).toBe('5551111212')
    expect(form.find(Input).find(SLDSInput).prop('value')).toBe('(555) 111-1212')
  })

  it('Should run onBlur correctly', function () {
    const onBlur = jest.fn()
    const form = mount(<Formik initialValues={{test: 'default'}}>
      <Input name="test" onBlur={onBlur} viewMask="(000) 000-0000" required/>
    </Formik>)
    const input = form.find(Input).find('input')
    input.simulate('blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  })
})
