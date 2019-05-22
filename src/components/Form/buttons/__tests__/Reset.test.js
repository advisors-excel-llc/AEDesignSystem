import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Formik, Form, getIn} from 'formik'
import Reset from '../reset'

configure({adapter: new Adapter()})

describe('Reset', function () {
  it('should reset the form', function () {
    const form = mount(<Formik initialValues={{
      test: 'Test'
    }}>
      <Form>
        <Reset label="Reset"/>
      </Form>
    </Formik>)

    expect(getIn(form.state('values'), 'test')).toBe('Test')

    form.instance().setFieldValue('test', 'Changed')

    expect(getIn(form.state('values'), 'test')).toBe('Changed')

    form.find(Reset).simulate('click')

    expect(getIn(form.state('values'), 'test')).toBe('Test')
  })
})