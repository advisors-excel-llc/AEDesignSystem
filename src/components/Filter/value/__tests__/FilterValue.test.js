import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FilterValue from '../'

configure({adapter: new Adapter()})

describe('FilterValue should render', function () {
  let predicate = ''
  const filters = {
    test: {
      id: 'test',
      property: 'test',
      value: undefined
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

  const filter = mount(<FilterValue property="test" label="Test" {...context}>
      {({property, label, filter: {id, value}, setFilterValue, setPredicate}) => {
        return <div className="test-field-value">
          <span className="label">{label}</span>
          <span className="value">{value}</span>
          <span className="change-value">
            <a href="javascript:void(0)" onClick={e => {
              e.preventDefault()
              setFilterValue(id, 'changed')
              setPredicate('is changed')
            }}>Change</a>
          </span>
        </div>
      }}
    </FilterValue>)

  it('should render and set values', function () {
    const filterValue = filter.find(FilterValue).renderProp('children')({...context, filter: context.getFilter('test'), property: 'test', label: 'Test'})
    expect(filter.prop('property')).toBe('test')
    expect(filterValue.exists('div.test-field-value')).toBe(true)

    const label = filterValue.find('span.label')
    expect(label.text()).toBe('Test')

    const value = filterValue.find('span.value')
    expect(value.text()).toBe('')

    const link = filterValue.find('.change-value a')
    link.simulate('click')

    const updatedValue = filter.find(FilterValue).renderProp('children')({...context, filter: context.getFilter('test'), property: 'test', label: 'Test'})
    expect(updatedValue.find('span.value').text()).toBe('changed')
    expect(filters.test.value).toBe('changed')
    expect(predicate).toBe('is changed')
  })
})