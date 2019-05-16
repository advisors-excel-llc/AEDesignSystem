import React from 'react'
import PropTypes from 'prop-types'
import Button from '@salesforce/design-system-react/lib/components/button'
import Modal from '@salesforce/design-system-react/lib/components/modal'

class Alert extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    buttonLabel: PropTypes.string,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'wrench', 'offline', 'info']),
    size: PropTypes.oneOf(['medium', 'large'])
  }

  static defaultProps = {
    buttonLabel: 'OK',
    variant: 'info',
    size: 'medium',
  }

  state = {
    isOpen: false
  }

  constructor (props) {
    super(props)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  show () {
    this.setState({isOpen: true})
  }

  hide () {
    this.setState({isOpen: false})
  }

  toggleOpen () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render () {
    const {title, buttonLabel, variant, size, children} = this.props
    return <Modal
      dismissible={false}
      dismissOnClickOutside={false}
      title={(<span>{title}</span>)}
      footer={[
        <Button
          key="promptBtn"
          label={buttonLabel}
          onClick={this.toggleOpen}
        />,
      ]}
      isOpen={this.state.isOpen}
      onRequestClose={this.toggleOpen}
      prompt={variant}
      size={size}
    >
      <div className="slds-m-around--medium">
        {children}
      </div>
    </Modal>
  }
}

export default Alert
