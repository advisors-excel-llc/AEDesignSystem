import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Fieldset from '../'

configure({adapter: new Adapter()})

describe('Fieldset should render', function () {
  it('has a label and children', function () {
    const fieldset = mount(<Fieldset label="Test Fieldset">
      <p>Test Body</p>
    </Fieldset>)

    const legend = fieldset.find('legend')
    expect(legend.text()).toBe('Test Fieldset')

    const body = fieldset.find('p')
    expect(body.text()).toBe('Test Body')
  })
})