import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FilterField from '../field'
import MockFilterValue from '../field/__tests__/MockFilterValue'
import Filter from '../index'

configure({adapter: new Adapter()})

describe('Filter', function () {
  const mountNode = document.createElement('body')
  const filters = [
    {
      property: 'test',
      value: 'off',
      isNew: false,
    },
  ]

  const filter = mount(<Filter filters={filters} isOpen={true}>
    <MockFilterValue property="test" label="Test"/>
  </Filter>, {attachTo: mountNode})

  it ('should have default values without modification', function () {
    expect(filter.state('modified')).toBe(false)
    expect(filter.state('activeFilters')).toHaveProperty("test")
    expect(filter.state('activeFilters').test).toEqual({property: "test", isNew: false, id: "test", value: "off"})
    expect(filter.state('properties')).toEqual({"test": "Test"})
    expect(filter.state('components')).toHaveLength(1)

    filter.find('.slds-filters__item .slds-grow button').simulate('click')

    expect(filter.contains(FilterField)).toBe(true)
    expect(filter.contains(MockFilterValue)).toBe(true)
    expect(document.body.querySelector('.mock-filter-value').textContent).toBe('Toggle Value')
  })

  it ('should allow for new filter', function () {
    filter.find('.slds-filters__footer SLDSButton').at(0).simulate('click')

    const filters = Object.values(filter.state('activeFilters')).filter(f => !f.property)
    expect(filters).toHaveLength(1)
  })
})