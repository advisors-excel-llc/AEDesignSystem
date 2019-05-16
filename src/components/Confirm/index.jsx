import React from 'react';
import PropTypes from 'prop-types';
import Button from '@salesforce/design-system-react/lib/components/button';
import Modal from '@salesforce/design-system-react/lib/components/modal';

class Confirm extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'wrench', 'offline', 'info']),
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    size: PropTypes.oneOf(['medium', 'large'])
  }

  static defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    variant: 'info',
    onOk: () => {},
    onCancel: () => {},
    size: 'medium',
  }

  state = {
    isOpen: false
  }

  constructor (props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.show = this.show.bind(this)
    this.confirmCancel = this.confirmCancel.bind(this);
    this.confirmOk = this.confirmOk.bind(this);
  }

  show() {
    this.setState({
      isOpen: true
    })
  }

  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  confirmOk() {
    this.toggleOpen();
    this.props.onOk();
  }

  confirmCancel() {
    this.toggleOpen();
    this.props.onCancel();
  }

  render() {
    const {title, cancelLabel, okLabel, variant, size, children} = this.props
    return <Modal
      dismissible={false}
      dismissOnClickOutside={false}
      title={(<span>{title}</span>)}
      footer={[
        <Button
          key="cancelBtn"
          label={cancelLabel}
          onClick={this.confirmCancel}
        />,
        <Button
          key="okBtn"
          variant="brand"
          label={okLabel}
          onClick={this.confirmOk}
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

export default Confirm;