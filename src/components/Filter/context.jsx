import React from 'react'

export const {Provider, Consumer} = React.createContext(
  {
    filters: {},
    properties: {},
    modified: false,
    setFilter: () => {},
    removeFilter: () => {},
    setFilterValue: () => {},
    getFilterValue: () => null,
    getFilter: () => null,
    setModified: () => {},
    setProperty: () => {},
    removeProperty: () => {},
    hasProperty: () => {},
  }
)

export function connect (WrappedComponent) {
  return ({children, ...props}) => <Consumer>
    {context => <WrappedComponent {...props} {...context}>{children}</WrappedComponent>}
  </Consumer>
}