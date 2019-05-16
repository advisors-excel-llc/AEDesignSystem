import React from 'react'
import FilterValue from '../../value'

const MockFilterValue = props => <FilterValue {...props}>
  {({filter: {id, value}, setPredicate, setFilterValue}) => <div className="mock-filter-value">
      <a href="javascript:void(0)" onClick={e => {
        e.preventDefault()
        const v = value === 'off' ? 'on' : 'off'
        setPredicate(`is ${v}`)
        setFilterValue(id, v)
      }}>
        Toggle Value
      </a>
    </div>
  }
</FilterValue>

MockFilterValue.buildFilterPredicate = FilterValue.buildFilterPredicate

export default MockFilterValue