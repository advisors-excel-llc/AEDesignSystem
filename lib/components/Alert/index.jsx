import React from 'react';
import PropTypes from 'prop-types';
import Button from '@salesforce/design-system-react/lib/components/button';
import Modal from '@salesforce/design-system-react/lib/components/modal';

class Alert extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string,
    variant: PropTypes.oneOf(["success", "warning", "error", "wrench", "offline", "info"])
  }

  static defaultProps = {
    buttonLabel: 'OK',
    variant: "info"
  }

  state = {
    isOpen: false
  }

  constructor (props) {
    super(props);
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return <Modal
      dismissible={false}
      title={(<span>{this.props.title}</span>)}
      footer={[
        <Button
          key="promptBtn"
          label={this.props.buttonLabel}
          onClick={this.toggleOpen}
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

export default Alert;
