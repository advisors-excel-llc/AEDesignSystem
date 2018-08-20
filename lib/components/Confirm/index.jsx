import React from 'react';
import PropTypes from 'prop-types';
import Button from '@salesforce/design-system-react/lib/components/button';
import Modal from '@salesforce/design-system-react/lib/components/modal';

class Confirm extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    okLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'wrench', 'offline', 'info']),
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    variant: 'info',
    onOk: () => {},
    onCancel: () => {}
  }

  state = {
    isOpen: false
  }

  constructor (props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.confirmCancel = this.confirmCancel.bind(this);
    this.confirmOk = this.confirmOk.bind(this);
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
    return <Modal
      dismissible={false}
      title={(<span>{this.props.title}</span>)}
      footer={[
        <Button
          key="cancelBtn"
          label={this.props.cancelLabel}
          onClick={this.confirmCancel}
        />,
        <Button
          key="okBtn"
          variant="brand"
          label={this.props.okLabel}
          onClick={this.confirmOk}
        />,
      ]}
      isOpen={this.state.isOpen}
      onRequestClose={this.toggleOpen}
      prompt={this.props.variant}
      size="medium"
    >
      <div className="slds-m-around--medium">
        {this.props.content}
      </div>
    </Modal>
  }
}

export default Confirm;