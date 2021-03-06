import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import FilterLookup from '../lookup'
import ComboBox from '@salesforce/design-system-react/lib/components/combobox'
import sinon from 'sinon'
import { wait } from '../../../../__tests__/util'

configure({adapter: new Adapter()})

describe('FilterLookup', function () {
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

  const onFilterInput = sinon.spy()

  it('Should have a default value of "default"', function () {
    const filter = mount(<FilterLookup property="test" label="Test" options={[
      {
        id: 'default',
        value: 'default',
        label: 'Default',
      },
      {
        id: 'changed',
        value: 'changed',
        label: 'Changed',
      }
    ]} multiple={false} onFilterInput={onFilterInput} {...context} filter={filters.test}/>)

    const input = filter.find(ComboBox)
    expect(input).toHaveLength(1)
    expect(input.prop('selection')[0].value).toBe('default')

    const inputProps = filter.find(FilterLookup).props()
    expect(FilterLookup.buildFieldPredicate(filters.test, inputProps)).toBe('is Default')
  })

  it('Should change single object value', function () {
    const filter = mount(<FilterLookup property="test" label="Test" options={[
      {
        id: 'default',
        value: 'default',
        label: 'Default',
      },
      {
        id: 'changed',
        value: 'changed',
        label: 'Changed',
      }
    ]}
                                       multiple={false}
                                       onFilterInput={onFilterInput}
                                       menuPosition="relative"
                                       {...context}
                                       filter={filters.test}
    />)
    const combo = filter.find('SLDSCombobox')

    combo.instance().setState({isOpen: true})
    combo.update()

    const option = filter.find('span.slds-listbox__option')

    expect(option).toHaveLength(1)

    option.at(0).simulate('click')
    expect(filters.test.value).toBe('changed')
  })

  it('Should change multiple object value', function () {
    const filterValue = {
      ...filters.test, value: [{
        id: 'default',
        value: 'default',
        label: 'Default',
      }]
    }
    const filter = mount(<FilterLookup property="test" label="Test" options={[
      {
        id: 'default',
        value: 'default',
        label: 'Default',
      },
      {
        id: 'changed',
        value: 'changed',
        label: 'Changed',
      }
    ]} multiple={true} onFilterInput={onFilterInput} {...context} filter={filterValue}/>)
    const combo = filter.find('SLDSCombobox')
    const input = combo.find('input')
    combo.setState({isOpen: false}).update()

    input.simulate('click')

    const option = filter.find('span.slds-listbox__option')

    expect(option).toHaveLength(1)

    option.at(0).simulate('click')
    expect(filters.test.value).toEqual(['default', 'changed'])
  })

  it('Should fire onFilterInput', async function () {
    const filter = mount(<FilterLookup property="test"
                                       label="Test"
                                       options={[
                                         {
                                           id: 'default',
                                           value: 'default',
                                           label: 'Default',
                                         },
                                         {
                                           id: 'changed',
                                           value: 'changed',
                                           label: 'Changed',
                                         }
                                       ]}
                                       multiple={false}
                                       onFilterInput={onFilterInput}
                                       msBeforeFilter={0}
                                       {...context}
                                       filter={filters.test}
    />)
    const combo = filter.find('SLDSCombobox')
    combo.setState({isOpen: false}).update()

    combo.prop('events').onChange({target: {value: 'test'}});

    await wait(10)

    expect(onFilterInput.callCount).toEqual(1)
    expect(onFilterInput.calledWith('test')).toBe(true)
  })
})