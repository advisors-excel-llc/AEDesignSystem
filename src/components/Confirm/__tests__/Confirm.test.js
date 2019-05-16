import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import Confirm from '../'

configure({adapter: new Adapter()})

describe('Confirm renders correctly', function () {
  const onCancel = sinon.spy()
  const onOk = sinon.spy()
  const confirm = mount(<Confirm title="Test Confirm"
                                 onCancel={onCancel}
                                 onOk={onOk}
                                 cancelLabel="Test Cancel"
                                 okLabel="Test Ok"
  >
    <p>Are you sure you want to test?</p>
  </Confirm>)

  it ('Has correct props', function () {
    expect(confirm.prop('title')).toBe('Test Confirm')
    expect(confirm.prop('size')).toBe('medium')
    expect(confirm.prop('variant')).toBe('info')
  })

  it ('Opens', function () {
    expect(confirm.state('isOpen')).toBe(false)

    confirm.instance().show()
    confirm.update()

    expect(confirm.state('isOpen')).toBe(true)

    const p = confirm.find('p')
    expect(p.text()).toBe('Are you sure you want to test?')
  })

  it('Cancels correctly', function () {
    onCancel.resetHistory()
    onOk.resetHistory()
    confirm.instance().show()
    confirm.update()

    const cancel = confirm.find('button.slds-button').at(0)
    expect(cancel.text()).toBe('Test Cancel')

    cancel.simulate('click')

    expect(confirm.state('isOpen')).toBe(false)
    expect(onCancel.called).toBe(true)
    expect(onOk.called).toBe(false)
  })

  it('OKs correctly', function () {
    onCancel.resetHistory()
    onOk.resetHistory()

    confirm.instance().show()
    confirm.update()

    const ok = confirm.find('button.slds-button').at(1)
    expect(ok.text()).toBe('Test Ok')

    ok.simulate('click')

    expect(confirm.state('isOpen')).toBe(false)
    expect(onCancel.called).toBe(false)
    expect(onOk.called).toBe(true)
  })
})