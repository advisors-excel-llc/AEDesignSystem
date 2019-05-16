import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FilterField from '../field'
import MockFilterValue from '../field/__tests__/MockFilterValue'
import FilterInput from '@salesforce/design-system-react/lib/components/filter'
import Filter from '../index'

configure({adapter: new Adapter()})

describe('Filter', function () {
  const filters = [
    {
      property: 'test',
      value: 'off',
      isNew: false,
    },
  ]
  const filter = mount(<Filter filters={filters} isOpen={true}>
    <MockFilterValue property="test" label="Test"/>
  </Filter>)

  it ('should have default values without modification', function () {
    expect(filter.state('modified')).toBe(false)
    expect(filter.state('activeFilters')).toHaveProperty("test")
    expect(filter.state('activeFilters').test).toEqual({property: "test", isNew: false, id: "test", value: "off"})
    expect(filter.state('properties')).toEqual({"test": "Test"})
    expect(filter.state('components')).toHaveLength(1)



    expect(filter.contains(FilterField)).toBe(true)
    expect(filter.contains(MockFilterValue)).toBe(true)
  })
})