import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Alert from '../'

configure({ adapter: new Adapter() });

describe('Alert renders correctly', function () {
  it('Opens and displays content', function () {
    const alert = mount(<Alert title="Test Alert" buttonLabel="Test" variant="warning">
      <p>This is a test</p>
    </Alert>)

    expect(alert.prop('title')).toBe('Test Alert')
    expect(alert.prop('variant')).toBe('warning')
    expect(alert.prop('size')).toBe('medium')
    expect(alert.state('isOpen')).toBe(false)

    alert.instance().show()
    alert.update()

    expect(alert.state('isOpen')).toBe(true)

    const p = alert.find('p')
    expect(p.text()).toBe('This is a test')

    const button = alert.find('button.slds-button')

    expect(button.text()).toBe('Test')

    button.simulate('click')

    expect(alert.state('isOpen')).toBe(false)
  })
})