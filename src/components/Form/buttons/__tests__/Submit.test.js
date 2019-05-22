import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Formik, Form, getIn} from 'formik'
import Submit from '../submit'
import sinon from 'sinon'
import { wait } from '../../../../__tests__/util'

configure({adapter: new Adapter()})

describe('Submit', function () {
  it('should submit the form', async function () {
    const onSubmit = sinon.spy()
    const form = mount(<Formik initialValues={{
      test: "Test"
    }}
                               onSubmit={onSubmit}
    >
      <Form>
        <Submit label="Submit"/>
      </Form>
    </Formik>)

    form.find(Submit).simulate('click')
    // Wait for validation to take place
    await wait(100)
    form.update()

    expect(onSubmit.callCount).toBe(1)
    expect(onSubmit.calledWith({test: 'Test'})).toBe(true)
  })
})