import React from 'react'

const MockFilterValue = ({filter: {id, value}, setPredicate, setFilterValue}) => <div className="mock-filter-value">
  <a href="javascript:void(0)" onClick={e => {
    e.preventDefault()
    const v = value === 'off' ? 'on' : 'off'
    setPredicate(`is ${v}`)
    setFilterValue(id, v)
  }}>
    Toggle Value
  </a>
</div>

MockFilterValue.buildFilterPredicate =  field => !!field.value && field.value.length > 0 && `is ${field.value}` || `is empty`

export default MockFilterValue