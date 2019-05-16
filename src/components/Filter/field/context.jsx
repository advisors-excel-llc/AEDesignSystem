import React from 'react'

export const {Provider, Consumer} = React.createContext({
  predicate: 'is empty',
  setPredicate: () => {},
})

export function connect (WrappedComponent) {
  return ({children, ...props}) => <Consumer>
    {context => <WrappedComponent {...props} {...context}>{children}</WrappedComponent>}
  </Consumer>
}