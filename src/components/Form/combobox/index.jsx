import React from 'react'
import PropTypes from 'prop-types'
import { getIn, connect } from 'formik'
import SFComboBox from '@salesforce/design-system-react/lib/components/combobox'
import comboboxFilterAndLimit from '@salesforce/design-system-react/lib/components/combobox/filter'

class ComboBox extends React.Component {
  state = {
    inputValue: ''
  }

  setInputValue = inputValue => this.setState({inputValue})

  static propTypes = {
    ...SFComboBox.propTypes,
    name: PropTypes.string.isRequired,
    selectAll: PropTypes.bool,
    clearAll: PropTypes.bool,
    selectAllLabel: PropTypes.string,
    clearAllLabel: PropTypes.string,
  }

  static defaultProps = {
    options: [],
    disabled: false,
    multiple: false,
    required: false,
    selectAll: false,
    clearAll: false,
    selectAllLabel: 'Select All',
    clearAllLabel: 'Clear All',
    optionValueProperty: 'id',
    variant: 'base',
    labels: {},
    onSubmit: () => {},
    onChange: () => {},
  }

  static compileChildrenOptions = (children) => {
    if (!children) return null
    let options = []

    children.forEach(child => {
      if (child instanceof Array) {
        options = options.concat(child.filter(c => typeof c === 'object' && c.hasOwnProperty('props')).map(({props}) => props))
      } else if (typeof child === 'object' && child.hasOwnProperty('props')) {
        options.push(child.props)
      }
    })

    return options.length && options || null
  }

  static extractValue = (selection = [], multiple = false, optionValueProperty = 'id') => {
    if (!multiple) {
      const item = selection.pop()
      if (!item) return ''

      return (item.hasOwnProperty('value') && !!item.value && typeof item.value === 'function' && item.value(item) || item.value)
        || (item.hasOwnProperty(optionValueProperty) && item[optionValueProperty])
        || ''
    }

    return selection.filter(item => !!item && item.hasOwnProperty('getValue') || item.hasOwnProperty(optionValueProperty))
      .map(item => (item.hasOwnProperty('value') && !!item.value && typeof item.value === 'function' && item.value(item) || item.value)
        || (item.hasOwnProperty(optionValueProperty) && item[optionValueProperty])
        || [])
  }

  render () {
    const {inputValue} = this.state
    const {
      name,
      children,
      options,
      disabled,
      multiple,
      required,
      selectAll,
      clearAll,
      selectAllLabel,
      clearAllLabel,
      optionValueProperty,
      variant,
      labels,
      label,
      placeholder,
      formik,
      onSubmit,
      onChange,
      ...componentProps
    } = this.props

    labels.label = label
    labels.placeholder = placeholder
    labels.placeholderReadOnly = placeholder

    componentProps.variant = variant

    if (multiple) {
      componentProps.multiple = true
    }

    if (required) {
      componentProps.required = true
    }

    if (disabled) {
      componentProps.disabled = true
    }

    const {setFieldValue, submitCount, setFieldTouched} = formik
    const value = getIn(formik.values, name)
    const touched = getIn(formik.touched, name)
    const error = (touched || submitCount > 0) && getIn(formik.errors, name)
    const childOptions = ComboBox.compileChildrenOptions(children) || options.map(o => typeof o === 'string' && {
      [optionValueProperty]: o,
      label: o
    } || o)
    const selection = childOptions.filter(o => {
      if (!o) return false

      if (o.hasOwnProperty('isMatch') && typeof o.isMatch === 'function') {
        return value instanceof Array ? value.filter(v => o.isMatch(v)).length : o.isMatch(value)
      }

      return o.hasOwnProperty(optionValueProperty) && (value instanceof Array ? value.includes(o[optionValueProperty]) : o[optionValueProperty] === value)
    })
    const componentOptions = variant === 'readonly' ? childOptions : comboboxFilterAndLimit({
      inputValue,
      options: (childOptions || []).filter(o => {
        if (!o) return false

        if (o.hasOwnProperty('isMatch') && typeof o.isMatch === 'function') {
          return !!selection && selection instanceof Array ? (selection.length === 0 || selection.filter(v => !o.isMatch(v)).length) : !o.isMatch(selection)
        }

        return o.hasOwnProperty(optionValueProperty) && !selection.filter(s => !!s && s.hasOwnProperty(optionValueProperty)).map(s => s[optionValueProperty]).includes(o[optionValueProperty])
      }),
      limit: 10,
      selection
    })

    return <React.Fragment>
      <SFComboBox {...componentProps}
                       labels={labels}
                       events={{
                         onSelect: (event, {selection = []}) => {
                           if (disabled) return
                           if (selection.length > 0) {
                             const item = selection[selection.length - 1]
                             const value = ComboBox.extractValue(selection, multiple, optionValueProperty)

                             if (item.hasOwnProperty('onSelect')) {
                               const e = new CustomEvent('item-selected')
                               item.onSelect(e, {form: formik, field: {name, value}, item})

                               if (!e.defaultPrevented) {
                                 setFieldValue(name, value)
                               }
                             } else {
                               setFieldValue(name, value)
                             }
                           }
                           this.setInputValue('')
                           setFieldTouched(name)
                         },
                         onChange: e => {
                           if (disabled) return
                           const value = e.target.value
                           this.setInputValue(value)
                           onChange(e, {value, form: formik, field: {name, value}})
                         },
                         onBlur: e => {
                           if (disabled) return
                           formik.handleBlur(e)
                         },
                         onRequestRemoveSelectedOption: (e, {selection = []}) => {
                           if (disabled) return
                           const value = ComboBox.extractValue(selection, multiple, optionValueProperty)
                           setFieldValue(name, value)
                           this.setInputValue('')
                           setFieldTouched(name)
                         },
                         onSubmit: (e, data) => {
                           if (disabled) return
                           onSubmit(e, {...data, form: formik, field: {name, value}})
                           this.setInputValue('')
                         }
                       }}
                       options={componentOptions}
                       selection={selection}
                       errorText={error || ''}
                       value={inputValue}
    />
      <div className="slds-text-align--right">
        {
          (multiple && selectAll && selection.length < childOptions.length) &&
          <a href="javascript:void(0);"
             className="combobox-select-all"
             onClick={() => setFieldValue(name, ComboBox.extractValue(childOptions, multiple, optionValueProperty))}>
            {selectAllLabel}
          </a>
        }
        {multiple && selectAll && clearAll && selection.length > 0 && selection.length < childOptions.length && ' | '}
        {
          (multiple && clearAll && selection.length > 0) &&
          <a href="javascript:void(0);"
             className="combobox-clear-all"
             onClick={() => setFieldValue(name, [])}>
            {clearAllLabel}
          </a>
        }
      </div>
    </React.Fragment>
  }
}

export default connect(ComboBox)