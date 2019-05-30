import React from 'react'
import PropTypes from 'prop-types'
import Combobox from '@salesforce/design-system-react/lib/components/combobox'
import comboboxFilterAndLimit from '@salesforce/design-system-react/lib/components/combobox/filter'

class ListFilter extends React.Component {
  state = {
    input: ''
  }

  setInput = input => this.setState({input})

  static propTypes = {
    options: PropTypes.array,
    multiple: PropTypes.bool,
    optionsLimit: PropTypes.number,
    property: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    isSelected: PropTypes.func,
  }

  static defaultProps = {
    isSelected: (value, values = []) => values.includes(value)
  }

  static displayName = 'ListFilter'

  static buildPredicate = (selection = [], multiple = false) => {
    if (selection.length === 0) return 'is empty'

    if (multiple) {
      let predicate = 'is '
      const visOptions = selection.splice(0, 3).map(({label}) => label)
      predicate += visOptions.join(', ')

      if (selection.length > 0) {
        predicate += ` and ${selection.length} more...`
      }

      return predicate
    }

    const item = selection.pop()

    return !!item ? `is ${item.label}` : 'is empty'
  }

  static buildFieldPredicate = (filter, props) => {
    const {value} = filter
    const {multiple, options, isSelected} = props
    const values = (value instanceof Array ? value : null !== value && [value] || [])
      .map(v => typeof v === 'object' ? v.value : v)
    const selection = options.map(v => typeof v === 'object' ? v : {
      id: v,
      label: v,
      value: v
    }).filter(({value}) => isSelected(value, values))

    return ListFilter.buildPredicate(selection, multiple)
  }

  render () {
    const {property, label, filter, setPredicate, setFilterValue, options = [], multiple, optionsLimit = 5, placeholder, isSelected, ...rest} = this.props
    const {input} = this.state

    if (!property) return null
    if (!filter || !property || property !== filter.property) return null

    const {id, value} = filter
    let comboOptions = options.map(o => {
      if (typeof o !== 'object') {
        return {
          id: o,
          value: o,
          label: o
        }
      }

      return {
        ...o,
        id: !!o.id && o.id || o.value
      }
    })

    const values = (value instanceof Array ? value : null !== value && [value] || [])
      .map(v => typeof v === 'object' ? v.value : v)
    const selection = comboOptions.filter(({value}) => isSelected(value, values))

    if (!!multiple) {
      rest.multiple = true

      comboOptions = comboboxFilterAndLimit({
        options: comboOptions,
        selection,
        limit: optionsLimit,
        inputValue: input,
      })
    }

    const onSelect = (e, {selection = []}) => {
      if (multiple) {
        setFilterValue(id, selection.map(({value}) => value))
      } else {
        const option = selection.pop()
        const value = !!option && option.value || undefined
        setFilterValue(id, value)
      }
      setPredicate(ListFilter.buildPredicate(selection, multiple))
    }

    return <Combobox {...rest}
                     labels={{
                       label,
                       placeholder,
                       placeholderReadOnly: placeholder,
                     }}
                     variant={!!multiple ? 'base' : 'readonly'}
                     options={comboOptions}
                     value={input}
                     selection={selection}
                     events={{
                       onChange: e => this.setInput(e.target.value),
                       onSelect,
                       onRequestRemoveSelectedOption: onSelect,
                     }}

    />
  }
}

export default ListFilter