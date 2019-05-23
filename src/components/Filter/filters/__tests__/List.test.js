import React from 'react'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from '../../field/context'
import FilterList from '../list'
import FilterValue from '../../value'
import ComboBox from '@salesforce/design-system-react/lib/components/combobox'

configure({adapter: new Adapter()})

describe('FilterList', function () {
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

  it('Should have a default value of "default"', function () {
    const filter = mount(<Provider value={context}>
      <FilterList property="test" label="Test" options={["default", "changed"]} multiple={false} />
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

    expect(FilterList.buildFieldPredicate(filters.test, {...input.props(), isSelected: FilterList.defaultProps.isSelected})).toBe('is default')
  })

  it('Should change single text value', function () {
    const filter = mount(<Provider value={context}>
      <FilterList property="test" label="Test" options={["default", "changed"]} multiple={false} />
    </Provider>, {
      context: {
        context: {...context, filter: filters.test}
      }
    })

    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: filters.test})
    const combo = rendered.find(ComboBox)
    const input = combo.find('input')

    input.simulate('click')

    const option = rendered.find('span.slds-listbox__option')

    expect(option).toHaveLength(2)

    option.at(1).simulate('click')
    expect(filters.test.value).toBe('changed')
  })

  it('Should change single object value', function () {
    const filter = mount(<Provider value={context}>
      <FilterList property="test" label="Test" options={[
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
      ]} multiple={false} />
    </Provider>, {
      context: {
        context: {...context, filter: filters.test}
      }
    })
    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: {
        id: 'test',
        property: 'test',
        value: 'default'
      }})
    const combo = rendered.find(ComboBox)
    const input = combo.find('input')

    input.simulate('click')

    const option = rendered.find('span.slds-listbox__option')

    expect(option).toHaveLength(2)

    option.at(1).simulate('click')
    expect(filters.test.value).toBe('changed')
  })

  it('Should change multiple text value', function () {
    const filterValue = {...filters.test, value: ["default"]}
    const filter = mount(<Provider value={context}>
      <FilterList property="test" label="Test" options={["default", "changed"]} multiple={true} />
    </Provider>, {
      context: {
        context: {...context, filter: filterValue}
      }
    })
    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: filterValue})
    const combo = rendered.find(ComboBox)
    const input = combo.find('input')

    input.simulate('click')

    const option = rendered.find('span.slds-listbox__option')

    expect(option).toHaveLength(1)

    option.at(0).simulate('click')
    expect(filters.test.value).toEqual(['default', 'changed'])
  })

  it('Should change multiple object value', function () {
    const filterValue = {...filters.test, value: ["default"]}
    const filter = mount(<Provider value={context}>
      <FilterList property="test" label="Test" options={[
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
      ]} multiple={true} />
    </Provider>, {
      context: {
        context: {...context, filter: filterValue}
      }
    })
    const wrapper = filter.find(FilterValue)
    const rendered = wrapper.renderProp('children')({...context, filter: filterValue})
    const combo = rendered.find(ComboBox)
    const input = combo.find('input')

    input.simulate('click')

    const option = rendered.find('span.slds-listbox__option')

    expect(option).toHaveLength(1)

    option.at(0).simulate('click')
    expect(filters.test.value).toEqual(['default', 'changed'])
  })
})