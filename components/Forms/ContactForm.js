import React, { Fragment, Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import axios from 'axios';

/** Components **/
import textareaFieldTempl from './reduxFields/textareaFieldTempl';
import inputFieldTempl from './reduxFields/inputFieldTempl';

import { is_email_valid } from '../../utils/validation';

class ContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false,
			submitted: false
		};
	}

	componentWillUnmount() {
		this.props.reset();
	}

	submitHandler = values => {
		axios
			.post(`/api/mailer/contactMsg`, values)
			.then(res => {
				this.setState({ submitted: true, error: false });
			})
			.catch(err => {
				const { error } = err.response.data;

				this.setState({ submitted: false, error });
			});
	};

	render() {
		const { handleSubmit, mode, formValues } = this.props;
		const { error, submitted } = this.state;

		return (
			<div className="row">
				<form onSubmit={handleSubmit(this.submitHandler)}>
					<div className="row">
						{error && <h4 className="red-text center-align">{error}</h4>}
						{submitted && <h4 className="green-text center-align">Message Submitted!</h4>}
						<Field name="subject" component={inputFieldTempl} label="Subject" placeholder="" />
						<Field name="message" component={textareaFieldTempl} label="Message" placeholder="" />
						<Field name="userEmail" component={inputFieldTempl} label="Your Email" placeholder="" />
					</div>

					<FormActions {...this.props} />
				</form>
			</div>
		);
	}
}

const FormActions = props => {
	return (
		<div className="col s12" style={{ marginTop: '20px' }}>
			<button type="submit" onClick={e => console.log('Submit cl')} className="btn btn-small right" style={{ margin: '0 5px' }}>
				<i className="material-icons left" style={{ verticalAlign: 'sub' }}>send</i> Submit
			</button>
		</div>
	);
};

function validate(values) {
	const errors = {};

	if (values && !values.subject) errors['subject'] = 'Subject cannot be empty';
	if (values && !values.message) errors['message'] = 'Message cannot be empty';
	if (values && !values.userEmail) errors['userEmail'] = 'We need your email to respond';

	if (values && values.userEmail && !is_email_valid(values.userEmail)) {
		errors['userEmail'] = 'Not valid format';
	}
	return errors;
}

/** Redux-Form wrapper **/
ContactForm = reduxForm({
	form: 'ContactForm',
	validate: validate,
	enableReinitialize: false,
	keepDirtyOnReinitialize: true
})(ContactForm);

function mapStateToProps(state, ownProps) {
	const { mode, type, record } = ownProps;

	let initialValues = {};
	const formValues = getFormValues('ContactForm')(state) || {};
	return { initialValues, formValues };
}

export default connect(mapStateToProps, {})(ContactForm);
