import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from '../../context'
import FilterField from '../'
import MockFilterValue from './MockFilterValue'
import Combobox from '@salesforce/design-system-react/lib/components/combobox'
import FilterInput from '@salesforce/design-system-react/lib/components/filter'

configure({adapter: new Adapter()})

describe('FilterField should render', function () {
  let mountNode = document.createElement('body')

  const filters = {
    test: {
      id: 'test',
      property: 'test',
      value: undefined
    }
  }

  const context = {
    filters,
    properties: {"test": "Test"},
    modified: false,
    setFilter: () => {},
    removeFilter: () => {},
    setFilterValue: (id, value) => filters[id].value = value,
    getFilterValue: id => filters.hasOwnProperty(id) && filters[id].value,
    getFilter: id => filters.hasOwnProperty(id) && filters[id],
    setModified: () => {},
    setProperty: () => {},
    removeProperty: () => {},
    hasProperty: prop => !!this.properties[prop],
  }

  const field = mount(
    <Provider value={context}>
      <FilterField components={[<MockFilterValue property="test" label="Test"/>]} filter={filters.test}/>
    </Provider>,
    {
      context: {
        context
      },
      attachTo: mountNode
    }
  )

  it('should render contents', function () {
    expect(field.contains(Combobox)).toBe(true)
    expect(field.contains(FilterField)).toBe(true)
    expect(field.contains(FilterInput)).toBe(true)
    expect(field.contains(MockFilterValue)).toBe(true)

    field.find('.slds-filters__item button').at(0).simulate('click')
    const filterIn = field.find(FilterInput)
    expect(filterIn.instance().state.popoverIsOpen).toBe(true)
  })
})