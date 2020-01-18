import React from 'react';
import Router from 'next/router';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';

/**  Components  **/
import inputFieldTempl from './reduxFields/inputFieldTempl';
import Tabs from '../Materialize/Tabs/Tabs';

/**  Actions  **/
import { signIn, signUp } from '../../store/actions';

/**  Utils  **/
import { is_email_valid } from '../../utils/validation';

class SignInUpForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			success: null,
			error: null
		};
	}

	signInEvent = values => {
		this.props
			.signIn({
				email: values.email,
				password: values.password
			})
			.then(res => {
				if (res.data.success == true) {
					if (res.data.user && res.data.user.admin) {
						Router.push('/admin');
					} else {
						Router.push('/account');
					}
				}
			})
			.catch(err => {
				const errMsq = err && err.response ? err.response.data.message : false;
				this.setState({ error: errMsq });
			});
	};

	signUpEvent = values => {

		this.props
			.signUp(values)
			.then(res => {
				this.setState({ success: res.data, error: false });
			})
			.catch(err => {
				// console.error('>>>signUp CATCH  catch', err.response);
				const messages = err.response && err.response.data.errors ? err.response.data.errors : false;

				//If array of errors
				if (messages[0]) {
					const errArr = messages.map(i => i.message);
					this.setState({ error: errArr.join('.') });
				} else {
					this.setState({ error: messages.message });
				}
			});
	};

	signInForm = () => {
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.signInEvent)} className="row">
				<Field name="email" label="Email" component={inputFieldTempl} placeholder="name@example.com" />
				<Field name="password" label="Password" type="password" component={inputFieldTempl} />

				<button className="btn" type="submit">
					Save
				</button>
			</form>
		);
	};

	signUpForm = () => {
		const {} = this.state;
		const { handleSubmit } = this.props;

		return (
			<form onSubmit={handleSubmit(this.signUpEvent)} className="row">
				<Field name="name" label="Name" component={inputFieldTempl} placeholder="" />
				<Field name="email" label="Email" component={inputFieldTempl} placeholder="name@example.com" />
				<Field name="password" label="Password" type="password" component={inputFieldTempl} />

				<button className="btn" type="submit">
					Save
				</button>
			</form>
		);
	};

	tabChanged = e => {
		const formId = e.target.id;
		if (formId == 0) {
			this.props.change('mode', 'sign-in');
		} else {
			this.props.change('mode', 'sign-up');
		}
	};

	render() {
		const { error, success } = this.state;
		const tabId = 'signUp';

		return (
			<div className="row" style={{ marginTop: '15px' }}>
				{error && <p className="red-text center">{error}</p>}
				{success && (
					<div>
						<h5 className="green-text center">{success.message}</h5>
					</div>
				)}

				{!success && (
					<Tabs id={tabId} menuList={['Sign In', 'Sign Up']} tabChangedCallback={this.tabChanged}>
						<div id={`tab-${tabId}-1`} className="col s12">
							{this.signInForm()}
						</div>
						<div id={`tab-${tabId}-2`} className="col s12">
							{this.signUpForm()}
						</div>
					</Tabs>
				)}
			</div>
		);
	}
}

const validate = values => {
	const errors = {};

	if (!values.email) errors['email'] = 'Required field';
	if (!values.password) errors['password'] = 'Required field';

	if (values.mode == 'sign-up') {
		if (!values.name) errors['name'] = 'Required field';
	}

	// Validation
	if (values.email && is_email_valid(values.email) !== true) errors['email'] = 'Wrong format';
	if (values.password && values.password.length < 3) errors['password'] = 'Must contain at least 6 letters ';

	return errors;
};

/** Redux-Form wrapper **/
SignInUpForm = reduxForm({
	form: 'SignInUpForm',
	validate: validate
})(SignInUpForm);

function mapStateToProps(state, ownProps, ownState) {
	let initialValues = {
		mode: 'sing-in'
	};

	const formValues = getFormValues('SignInUpForm')(state) || {};
	return {
		initialValues,
		formValues
	};
}
export default connect(mapStateToProps, { signIn, signUp })(SignInUpForm);
