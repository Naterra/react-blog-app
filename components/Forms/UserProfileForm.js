import React, { Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

/**  Components  **/
import inputFieldTempl from './reduxFields/inputFieldTempl';
import FileUploadButton from './reduxFields/FileUploadButton/FileUploadButton';

/**  Actions  **/
import { updateUserProfile  } from '../../store/actions';
import axios from "axios";

class UserProfileForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			success: null,
			successMsg: false,
			errorMsg: null
		};

		// Events
		this.submitEvent = this.submitEvent.bind(this);
	}

	async componentDidMount() {}

	submitEvent(values) {
		const { router } = this.props;

		console.error('  Submit props', this.props);
		console.error('  Submit', values);

		const file = values.avatar ? values.avatar[0] :false;
		console.error('Submit file', file);



			this.props.updateUserProfile(values, file )
				.then(res => {
					console.warn("THEN", res);
					console.warn("THEN router", router);
					this.props.change('image', res.data.image);
					window.location.href = '/account/account-settings';

					router.reload('/account/account-settings');
					// this.setState({success:true});
					// this.props.classCreatedCallback();
					// this.props.reset(); // reset form if success
				})
				.catch(err => {
					// console.error('CATCH', err);
				});

	}

	render() {
		const { err, success, successMsg, errorMsg } = this.state;
		const { formValues,  initialValues, handleSubmit } = this.props;
		console.warn("___FORM::render", this.props);

		if (successMsg) {
			return (
				<div>
					<h5 className="green-text center">Сохранено</h5>
				</div>
			);
		}
		const image = initialValues.image ? initialValues.image : (formValues.image ? formValues.image : false);


		return (
			<div className="" style={{ marginTop: '15px' }}>

						{errorMsg && <p className="red-text">{errorMsg}</p>}
						<form onSubmit={handleSubmit(this.submitEvent)} className="flex">
							<div className="col s12">
								<Field name="name" label="Имя" component={inputFieldTempl} placeholder="" />
							</div>

							{image   && (<div className="col s12">
								<img className="responsive-img"  src={image} />
							</div>)}

							{ !image && <div className="col s12">
								<Field name="avatar" label="Аватар" component={FileUploadButton} placeholder="" />
							</div>}


									<div className="col s12">
										<div className="input-field ">
											<button className="btn btn-small right" type="submit">
												Сохранить
											</button>
										</div>
									</div>
						</form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.name) errors['name'] = 'Заполните поле';
	// if (!values.organizationId) errors['organizationId'] = 'Заполните поле';

	return errors;
}

/** Redux-Form wrapper **/
UserProfileForm = reduxForm({
	form: 'UserProfileForm',
	validate: validate
})(UserProfileForm);

function mapStateToProps(state, ownProps, ownState) {
	const { user} = ownProps;
	console.warn("___FORM::ownProps", ownProps);

	let initialValues = {};

	if(user && user._id){
		initialValues._id = user._id;
		initialValues.name = user.name;
		initialValues.image = user.image;
	}

	// console.warn("___FORM::initialValues", initialValues);

	const formValues = getFormValues('UserProfileForm')(state) || {};
	return {
		initialValues,
		formValues
	};
}

export default withRouter(
	connect(mapStateToProps, { updateUserProfile  })(UserProfileForm)
);
