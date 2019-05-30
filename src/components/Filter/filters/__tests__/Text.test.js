import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FilterText from '../text'
import Input from '@salesforce/design-system-react/lib/components/input'

configure({adapter: new Adapter()})

describe('FilterText', function () {
  let predicate = ''
  const filters = {
    test: {
      id: 'test',
      property: 'test',
      value: 'default'
    }
  }

  const context = {
    predicate,
    setPredicate: p => predicate = p,
    filters,
    properties: {},
    modified: false,
    setFilter: () => {},
    removeFilter: () => {},
    setFilterValue: (id, value) => filters[id].value = value,
    getFilterValue: id => filters.hasOwnProperty(id) && filters[id].value,
    getFilter: id => filters.hasOwnProperty(id) && filters[id],
    setModified: () => {},
    setProperty: () => {},
    removeProperty: () => {},
    hasProperty: () => {},
  }

  const filter = mount(<FilterText property="test" label="Test" {...context} filter={filters.test} />)

  it('Should have a default value of "default"', function () {
    const input = filter.find(Input)
    expect(input).toHaveLength(1)
    expect(input.prop('value')).toBe('default')
  })

  it('Should change the filter value and predicate', function () {
    const input = filter.find('input')
    expect(input).toHaveLength(1)

    input.simulate('change', {target: {value: 'new value'}})
    expect(filters.test.value).toBe('new value')
    expect(predicate).toBe('contains new value')
  })
})