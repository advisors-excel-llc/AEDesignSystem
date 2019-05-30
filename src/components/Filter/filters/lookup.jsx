import React from 'react'
import PropTypes from 'prop-types'
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

class LookupFilter extends React.Component {
  state = {
    input: '',
    tid: 0,
    prevSelections: []
  }

  static buildSelection = props => {
    const {
      filter: {value},
      options,
      idProperty,
      labelProperty,
      valueProperty,
      iconName,
      iconCategory,
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

  static propTypes = {
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
    msBeforeFilter: PropTypes.number,
  }

  static defaultProps = {
    options: [],
    multiple: false,
    optionsLimit: 5,
    onChange: () => {},
    idProperty: 'id',
    labelProperty: 'label',
    valueProperty: 'value',
    iconCategory: 'standard',
    msBeforeFilter: 500,
  }

  static buildPredicate = (selection = [], multiple) => {
    return ListFilter.buildPredicate(selection, multiple)
  }

  static buildFieldPredicate = (filter, props) => {
    const {multiple} = props
    const selection = LookupFilter.buildSelection({...props, filter})

    return LookupFilter.buildPredicate(selection, multiple)
  }

  static displayName = 'LookupFilter'

  buildOptions = (options, selection) => {
    const {valueProperty = 'value'} = this.props

    return options.filter(
      o => o.hasOwnProperty(valueProperty) && !selection.map(
        s => s.hasOwnProperty(valueProperty) && s[valueProperty]
      ).includes(o[valueProperty])
    )
  }
  setInput = input => this.setState({input})
  setTid = tid => this.setState({tid})
  setPrevSelections = prevSelections => this.setState({prevSelections})
  addToPrevSelections = entity => {
    const {prevSelections} = this.state
    const entities = dedupe([].concat(prevSelections, entity))

    if (prevSelections.length !== entities.length) {
      this.setPrevSelections(entities)
    }
  }

  render () {
    const {input, tid = 0, prevSelections = []} = this.state
    const {
      property,
      options,
      multiple,
      optionsLimit,
      label,
      placeholder,
      onFilterInput,
      onChange,
      idProperty,
      labelProperty,
      valueProperty,
      loading,
      iconName,
      iconCategory,
      msBeforeFilter,
      filter,
      setFilterValue,
      setPredicate,
      ...rest
    } = this.props

    if (!property) return null
    if (!filter || !property || property !== filter.property) return null

    const selection = LookupFilter.buildSelection({...this.props, filter})

    this.addToPrevSelections(selection)

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

    const dedupedChoices = dedupe(choices.concat(prevSelections))
    choices = comboboxFilterAndLimit({
      options: !multiple ? dedupedChoices : this.buildOptions(dedupedChoices, selection),
      selection,
      limit: optionsLimit,
      inputValue: input
    })

    const onSelect = (e, {selection = []}) => {
      this.setInput('')
      const values = selection.map(({value}) => value)
      setFilterValue(filter.id, !multiple ? values.pop() : values)
      setPredicate(LookupFilter.buildPredicate(selection, multiple))
      this.addToPrevSelections(selection)
      onChange(!multiple ? values.pop() : values, this.props)
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
                      this.setInput(value)
                      clearTimeout(tid)
                      const timeoutId = setTimeout(() => onFilterInput(value, this.props), msBeforeFilter)
                      this.setTid(timeoutId)
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
  }
}

export default LookupFilter