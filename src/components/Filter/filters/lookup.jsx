import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FilterValue from '../value'
import Combobox from '@salesforce/design-system-react/lib/components/combobox'
import comboboxFilterAndLimit from '@salesforce/design-system-react/lib/components/combobox/filter'
import Spinner from '@salesforce/design-system-react/lib/components/spinner'
import Icon from '@salesforce/design-system-react/lib/components/icon'
import ListFilter from './list'

const dedupe = selection => selection.reduce((acc, curr) => {
  if (typeof curr === 'object' && null !== curr && !acc.map(({value}) => value).includes(curr.value)) {
    acc.push(curr)
  }

  return acc
}, [])

const LookupFilter = props => {
  const [input, setInput] = useState()
  const [tid, setTid] = useState(0)
  const [prevSelections, setPrevSelections] = useState([])
  const {
    property,
    options = [],
    multiple = false,
    optionsLimit = 5,
    label,
    placeholder,
    onFilterInput,
    onChange = () => {},
    idProperty = 'id',
    labelProperty = 'label',
    valueProperty = 'value',
    loading,
    iconName,
    iconCategory = 'standard',
    ...rest
  } = props

  const addToPrevSelections = entity => {
    const entities = dedupe([].concat(prevSelections, entity))

    if (prevSelections.length !== entities.length) {
      setPrevSelections(entities)
    }
  }

  return <FilterValue property={property} label={label}>
    {filterState => {
      const {filter, setFilterValue, setPredicate} = filterState
      const selection = LookupFilter.buildSelection({...props, filter})

      addToPrevSelections(selection)

      let choices = []
        .concat(options)
        .filter(entity => !!entity && entity.hasOwnProperty(valueProperty))
        .map(entity => {
        const label = entity.hasOwnProperty(labelProperty) ? entity[labelProperty] : entity[valueProperty]
        const item = {
          id: entity.hasOwnProperty(idProperty) ? entity[idProperty] : entity[valueProperty],
          value: entity[valueProperty],
          label: label,
        }

        if (null !== iconName && null !== iconCategory) {
          item.icon = <Icon assistiveText={label} name={iconName} category={iconCategory} size="small"/>
        }

        return item
      })

      choices = comboboxFilterAndLimit({
        options: dedupe(choices.concat(prevSelections)),
        selection,
        limit: optionsLimit,
        inputValue: input
      })

      const onSelect = (e, {selection = []}) => {
        setInput('')
        const values = selection.map(({value}) => value)
        setFilterValue(filter.id, !multiple ? values.pop() : values)
        setPredicate(LookupFilter.buildPredicate(selection, multiple))
        addToPrevSelections(selection)
        onChange(!multiple ? values.pop() : values, filterState)
      }

      return <div className="slds-grid">
        <div className="slds-grow">
          <Combobox {...rest}
                    labels={{
                      ...rest.labels = {},
                      label,
                      placeholder,
                      placeholderReadOnly: placeholder,
                      noOptionsFound: loading ? 'Searching...' : 'No entries found'
                    }}
                    events={{
                      onChange: ({target: {value}}) => {
                        setInput(value)
                        clearTimeout(tid)
                        let timeoutId = setTimeout(() => onFilterInput(value, filterState), 500)
                        setTid(timeoutId)
                      },
                      onSelect,
                      onRequestRemoveSelectedOption: onSelect,
                    }}
                    value={input}
                    selection={selection}
                    options={choices}
                    variant={!multiple ? 'inline-listbox' : 'base'}
                    multiple={multiple}
          />
        </div>
        {loading && <div style={{width: '25px', paddingTop: '35px', paddingLeft: '10px'}}>
          <Spinner size="x-small" containerClassName="slds-spinner_inline"/>
        </div>}
      </div>
    }}
  </FilterValue>
}

LookupFilter.propTypes = {
  property: PropTypes.string.isRequired,
  options: PropTypes.array,
  multiple: PropTypes.bool,
  optionsLimit: PropTypes.number,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  iconName: PropTypes.string,
  iconCategory: PropTypes.string,
  loading: PropTypes.bool,
  onFilterInput: PropTypes.func.isRequired,
  idProperty: PropTypes.string,
  labelProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  onChange: PropTypes.func,
}

LookupFilter.buildSelection = props => {
  const {
    filter: {value},
    options = [],
    idProperty,
    valueProperty,
    labelProperty,
    iconName,
    iconCategory
  } = props

  return (value instanceof Array ? value : null !== value && [value] || [])
    .map(v => {
      if (typeof v === 'object') return v
      if (!(options instanceof Array)) return null

      const entity = options.filter(e => e.hasOwnProperty(valueProperty) && e[valueProperty] == v).pop()

      if (!entity) return null
      const label = entity.hasOwnProperty(labelProperty) ? entity[labelProperty] : entity[valueProperty]
      let icon
      if (null !== iconName && null !== iconCategory) {
        icon = <Icon assistiveText={label} name={iconName} category={iconCategory} size="small"/>
      }

      return {
        id: entity.hasOwnProperty(idProperty) ? entity[idProperty] : entity[valueProperty],
        value: entity[valueProperty],
        label,
        icon
      }
    })
    .filter(v => !!v)
}

LookupFilter.buildPredicate = (selection = [], multiple) => {
  return ListFilter.buildPredicate(selection, multiple)
}

LookupFilter.buildFieldPredicate = (filter, props) => {
  const {multiple} = props
  const selection = LookupFilter.buildSelection({...props, filter})

  return LookupFilter.buildPredicate(selection, multiple)
}

LookupFilter.displayName = 'ListFilter'

export default LookupFilter