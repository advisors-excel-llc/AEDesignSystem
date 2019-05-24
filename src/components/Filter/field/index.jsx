import React from 'react'
import PropTypes from 'prop-types'
import FilterInput from '@salesforce/design-system-react/lib/components/filter'
import ComboBox from '@salesforce/design-system-react/lib/components/combobox'
import { connect } from '../context'
import { Provider } from './context'

class FilterField extends React.Component {

  static propTypes = {
    filter: PropTypes.shape({
      property: PropTypes.string,
      value: PropTypes.any,
      isNew: PropTypes.bool,
    }).isRequired,
    components: PropTypes.arrayOf(
      PropTypes.node
    )
  }

  state = {
    predicate: 'is empty'
  }

  setPredicate = predicate => this.setState({predicate})

  render () {
    const {predicate} = this.state
    const {filters, removeFilter, setFilter, components = [], filter, properties, ...rest} = this.props
    const selection = !!filter.property
      && Object.entries(properties)
        .filter(([property]) => filter.property === property)
        .map(([property, label]) => ({
          id: property,
          label: label
        }))
      || []
    const availFields = Object.keys(properties)
      .filter(property => !Object.keys(filters).includes(property))
      .map(property => ({
        id: property,
        label: properties[property]
      }))
      .concat(selection)
      .reduce((fields, curr) => {
        if (!!curr && !fields.map(({id}) => id).includes(curr.id)) {
          fields.push(curr)
        }

        return fields
      }, [])
    const valueField = !!filter.property && components.filter(child => {
      if (!!child.props && !!child.props.property) {
        return child.props.property === filter.property
      }
      return false
    }).pop()

    if (null !== filter.value && typeof filter.value !== 'undefined' && !!valueField && typeof valueField.type.buildFieldPredicate === 'function') {
      const newPredicate = valueField.type.buildFieldPredicate(filter, valueField.props)
      if (newPredicate !== predicate) this.setPredicate(newPredicate)
    }

    return (filter.isNew
      || Object.keys(properties).includes(filter.property))
      && <FilterInput predicate={predicate}
                      property={!!filter.property && properties[filter.property] || 'New Filter'}
                      onRemove={() => removeFilter(filter.id)}
                      onClick={() => {
                        // When selecting a filter, something in the popover or filter component tries to
                        // scroll the window and it's annoying. This puts the scroll top value back to what
                        // it was when the filter was clicked
                        let {scrollY} = window
                        if (document.hasOwnProperty('scrollingElement')) {
                          scrollY = document.scrollingElement.scrollTop
                        }
                        setTimeout(() => {
                          if (document.hasOwnProperty('scrollingElement')) {
                            document.scrollingElement.scrollTo({top: scrollY})
                          } else if (!!window.scrollTo) {
                            window.scrollTo({top: scrollY})
                          }
                        }, 1)
                      }}
      >
        <div className="slds-p-around--small">
          <ComboBox options={availFields}
                    labels={{
                      label: 'Field',
                      placeholderReadOnly: 'Select a Field',
                    }}
                    required
                    selection={selection}
                    events={{
                      onSelect: (e, {selection}) => {
                        const {id} = selection.pop()
                        setFilter({...filter, property: id, value: null})
                      }
                    }}
                    variant="readonly"
                    disabled={!filter.isNew}
          />
        </div>
        <div className="slds-p-around--small">
          <Provider value={{predicate, setPredicate: this.setPredicate, filters, removeFilter, setFilter, filter, properties, ...rest}}>
            {valueField}
          </Provider>
        </div>
      </FilterInput>
  }
}

export default connect(FilterField)