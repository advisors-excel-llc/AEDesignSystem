import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Formik, getIn } from 'formik'
import StatesComboBox from '../states'
import states from '../presets/states'

configure({adapter: new Adapter()})

describe('StatesComboBox', function () {
  it('should have state options and select all, deselect all', function () {
    const form = mount(<Formik>
      <StatesComboBox name="test" multiple />
    </Formik>)

    form.find('a.combobox-select-all').simulate('click')
    expect(getIn(form.state('values'), 'test')).toEqual(states.map(({value}) => value))
    form.find('a.combobox-clear-all').simulate('click')
    expect(getIn(form.state('values'), 'test')).toEqual([])
  })
})