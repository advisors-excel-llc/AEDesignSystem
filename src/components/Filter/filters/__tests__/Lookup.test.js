import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from '../../field/context'
import FilterLookup from '../lookup'
import FilterValue from '../../value'
import ComboBox from '@salesforce/design-system-react/lib/components/combobox'
import sinon from 'sinon'
import {wait} from '../../../../__tests__/util'

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
    const filter = mount(<Provider value={context}>
      <FilterLookup property="test" label="Test" options={[
        {
          id: "default",
          value: "default",
          label: "Default",
        },
        {
          id: "changed",
          value: "changed",
          label: "Changed",
        }
      ]} multiple={false} onFilterInput={onFilterInput} />
    </Provider>, {
      context: {
        context: {...context, filter: filters.test}
      }
    })

    const wrapper = filter.find(FilterValue)
    expect(wrapper).toHaveLength(1)
    const rendered = wrapper.renderProp('children')({...context, filter: filters.test})
    const input = rendered.find(ComboBox)
    expect(input).toHaveLength(1)
    expect(input.prop('selection')[0].value).toBe('default')

    const inputProps = filter.find(FilterLookup).props()
    expect(FilterLookup.buildFieldPredicate(filters.test, inputProps)).toBe('is Default')
  })

  it('Should change single object value', function () {
    const filter = mount(<Provider value={context}>
      <FilterLookup property="test" label="Test" options={[
        {
          id: "default",
          value: "default",
          label: "Default",
        },
        {
          id: "changed",
          value: "changed",
          label: "Changed",
        }
      ]}
                    multiple={false}
                    onFilterInput={onFilterInput}
                    menuPosition="relative"
      />
    </Provider>, {
      context: {
        context: {...context, filter: filters.test}
      }
    })
    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: filters.test})
    const combo = rendered.find(ComboBox)


    combo.instance().instanceRef.setState({isOpen: true})
    combo.update()

    const option = rendered.find('span.slds-listbox__option')

    expect(option).toHaveLength(2)

    option.at(1).simulate('click')
    expect(filters.test.value).toBe('changed')
  })

  it('Should change multiple object value', function () {
    const filterValue = {...filters.test, value: [{
        id: "default",
        value: "default",
        label: "Default",
      }]}
    const filter = mount(<Provider value={context}>
      <FilterLookup property="test" label="Test" options={[
        {
          id: "default",
          value: "default",
          label: "Default",
        },
        {
          id: "changed",
          value: "changed",
          label: "Changed",
        }
      ]} multiple={true} onFilterInput={onFilterInput} />
    </Provider>, {
      context: {
        context: {...context, filter: filterValue}
      }
    })
    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: filterValue})
    const combo = rendered.find(ComboBox)
    const input = combo.find('input')
    combo.setState({isOpen: false}).update()

    input.simulate('click')

    const option = rendered.find('span.slds-listbox__option')

    expect(option).toHaveLength(1)

    option.at(0).simulate('click')
    expect(filters.test.value).toEqual(['default', 'changed'])
  })

  it('Should fire onFilterInput', async function () {
    const filter = mount(<Provider value={context}>
      <FilterLookup property="test"
                    label="Test"
                    options={[
        {
          id: "default",
          value: "default",
          label: "Default",
        },
        {
          id: "changed",
          value: "changed",
          label: "Changed",
        }
      ]}
                    multiple={false}
                    onFilterInput={onFilterInput}
                    msBeforeFilter={0}
      />
    </Provider>, {
      context: {
        context: {...context, filter: filters.test}
      }
    })
    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: filters.test})
    const combo = rendered.find(ComboBox)

    combo.instance().instanceRef.handleInputChange({target: {value: 'test'}})

    await wait(10)

    expect(onFilterInput.callCount).toEqual(1)
    expect(onFilterInput.calledWith('test')).toBe(true)
  })
})