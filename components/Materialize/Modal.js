import React from 'react';

export default class Modal extends React.Component {
	constructor(props) {
		super(props);

		this.modalRef = React.createRef();

		this.instance = null;

		/** Events **/
		this.toggleModal = this.toggleModal.bind(this);
		this.onLinkClick = this.onLinkClick.bind(this);
	}

	componentDidMount() {
		const { onCloseCallback, onOpenCallback } = this.props;

		let options = {
			onCloseStart: () => {
				if(onCloseCallback) onCloseCallback();
			},
			onOpenStart: () => {
				if(onOpenCallback) onOpenCallback();
			}
		};

		this.instance = M.Modal.init(this.modalRef.current, options);

		this.toggleModal(this.props.status);
	}

	componentDidUpdate(prevProps, prevState) {
		const { status } = this.props;

		// Prop Status changed
		if (prevProps.status !== status) {
			this.toggleModal(status);
		}
	}

	componentWillUnmount() {
		this.instance.destroy();
	}

	toggleModal(status) {
		// console.error('toggleModal', status);
		if (status == true) {
			// Open Modal
			this.instance.open();
		} else {
			this.instance.close();
		}
	}

	onLinkClick() {
		this.toggleModal(true);
	}
	render() {
		// console.error(' MODAL::render', this.props);
		const { id, text, action_component, children } = this.props;

		return (
			<React.Fragment>
				{text && <a onClick={this.onLinkClick}>{this.props.text}</a>}
				{action_component && <div onClick={this.onLinkClick}>{action_component}</div>}

				<div ref={this.modalRef} id={id} className="modal">
					<div className="modal-content">{children}</div>
				</div>
			</React.Fragment>
		);
	}
}

export const ModalTrigger = ({ children, ModalId }) => {
	return (
		<a className="modal-trigger" href={`#${ModalId}`}>
			{children}
		</a>
	);
};

/*
*  EXAMPLES:
*
*  <ModalTrigger ModalId="ModalName">
*     <i className="material-icons red-text" onClick={e=>this.openDeleteClassModal(item._id, item)} >close</i>
*  </ModalTrigger>
*
*
*  <Modal id="classRecordModal" status={this.state.classRecordModalStatus}>
*     {this.state.ModalFormContent}
*  </Modal>
* */
