import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@salesforce/design-system-react/lib/components/panel'
import PanelFilterGroup from '@salesforce/design-system-react/lib/components/panel/filtering/group'
import PanelFilterList from '@salesforce/design-system-react/lib/components/panel/filtering/list'
import FilterField from './field'
import { Provider } from './context'

class Filter extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        property: PropTypes.string.isRequired,
        value: PropTypes.any,
        isNew: PropTypes.bool,
      })
    ).isRequired,
  }

  static defaultProps = {
    isOpen: false,
    onClose: () => {},
    onSave: () => {},
    filters: [],
    values: [],
    style: {}
  }

  state = {
    modified: false,
    activeFilters: {},
    properties: {},
    components: []
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const {activeFilters = {}, modified} = prevState

    if (modified) return prevState

    const {filters = {}, children} = nextProps
    const components = [].concat(children)
    const properties = Object.fromEntries(components.map(({props: {property, label}}) => [property, label || property]))

    if (filters !== activeFilters) {
      return {
        ...prevState,
        activeFilters: Object.fromEntries(filters
          .filter(({property}) => Object.keys(properties).includes(property))
          .map(f => {
            if (!f.hasOwnProperty('id') || !f.id) {
              return [f.property, {...f, id: f.property || Filter.generatedId(), isNew: false}]
            }

            return [f.property, {...f, isNew: false}]
          })),
        components,
        properties,
      }
    }

    return prevState
  }

  static generateId () {
    return (new Date).getTime() * (Math.random() * 1000).toFixed(0).toString()
  }

  addNewItem = () => {
    const id = Filter.generateId()
    this.setState({
      modified: true,
      activeFilters: Object.assign(
        {},
        this.state.activeFilters,
        {
          [id]: {
            id,
            isNew: true,
            property: null,
            value: null
          }
        }
      )
    })
  }

  shouldComponentUpdate (nextProps, prevState) {
    const {children} = nextProps
    const {components} = prevState
    const nextComponents = [].concat(children)

    if (components.length !== nextComponents.length) return true

    return this.state !== prevState || nextComponents.reduce((changed, nextComp) => {
      const comp = components.filter(({props}) => {
        const {property} = props
        if (!property) return false

        return nextComp.props.property === property
      }).pop()

      return changed || !!comp && JSON.stringify(nextComp.props) !== JSON.stringify(comp.props)
    }, false)
  }

  compileFilterValues = () => {
    return Object.fromEntries(
      Object.values(this.state.activeFilters).map(({property, value}) => [property, value])
    )
  }

  render () {
    const {children} = this.props

    return this.props.isOpen && <div className="slds-grid_vertical-align-start slds-grow" style={this.props.style}>
      <Panel variant="filters">
        <PanelFilterGroup modified={this.state.modified}
                          variant="panel"
                          onClickAdd={this.addNewItem}
                          onRequestCancel={() => {
                            this.setState({modified: false})
                          }}
                          onRequestClose={() => {
                            this.setState({modified: false})
                            this.props.onClose()
                          }}
                          onRequestSave={() => {
                            this.props.onSave(this.compileFilterValues())
                            this.setState({modified: false})
                          }}
                          onClickRemoveAll={() => {
                            this.setState({
                              activeFilters: {},
                              modified: this.state.modified || this.state.activeFilters != this.props.filters
                            })
                          }}
        >
          {Object.keys(this.state.activeFilters).length === 0 && <div className="slds-align_absolute-center">
            <p className="slds-text-heading">
              No
              filters {this.state.modified ? 'will be applied to the results upon save' : 'have been applied to the current results'}</p>
          </div>}
          <PanelFilterList>
            <Provider value={{
              filters: this.state.activeFilters,
              properties: this.state.properties,
              modified: this.state.modified,
              setModified: modified => this.setState({modified}),
              setFilter: ({id, ...filter}) => {
                if (!id) throw new Error('`id` is a required property when adding a filter')
                this.setState({
                  modified: true,
                  activeFilters: {...this.state.activeFilters, [id]: {...filter, id}}
                })
              },
              removeFilter: id => {
                if (!id) throw new Error('`id` is required when removing a filter')
                const filters = Object.assign({}, this.state.activeFilters)
                delete filters[id]
                this.setState({
                  modified: true,
                  activeFilters: filters
                })
              },
              getFilter: property => this.state.activeFilters[property],
              setFilterValue: (id, value) => {
                if (this.state.activeFilters.hasOwnProperty(id)) {
                  const filter = Object.assign({}, this.state.activeFilters[id])
                  filter.value = value

                  this.setState({
                    modified: true,
                    activeFilters: Object.assign({}, this.state.activeFilters, {[id]: filter})
                  })
                }
              },
              getFilterValue: id => {
                const filter = this.state.activeFilters[id]

                if (!filter) return null

                return filter.value
              },
              setProperty: (property, label) => {
                this.setState({
                  properties: {...this.state.properties, [property]: label}
                })
              },
              removeProperty: property => {
                const props = Object.assign({}, this.state.properties)
                delete props[property]

                this.setState({
                  properties: props
                })
              },
              hasProperty: property => {
                return !!this.state.properties[property]
              }
            }
            }>
              {Object.values(this.state.activeFilters).map(
                filter => <FilterField filter={filter} components={children instanceof Array ? children : [children]} key={filter.id}/>
              )}
            </Provider>
          </PanelFilterList>
        </PanelFilterGroup>
      </Panel>
    </div>
  }
}

export default Filter