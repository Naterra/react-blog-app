import React, { Fragment, Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import Router from 'next/router';
import dynamic from 'next/dynamic';

/** Components **/
import inputFieldTempl from './reduxFields/inputFieldTempl';
import FileUploadButton from './reduxFields/FileUploadButton/FileUploadButton';
import InputCheckbox from './reduxFields/Checkbox/Checkbox';

const CKEditor = dynamic(() => import('./reduxFields/CKEditor/CKEditor.js'), {
	ssr: false
});

/**  Actions  **/
import { getPage, savePage, deletePage } from '../../store/actions';

class PageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null
		};
	}

	componentWillUnmount() {
		this.props.reset();
	}

	componentDidMount() {
		const { mode, router } = this.props;

		if (mode == 'edit') {
			const recordId = router.query.edit;

			// Load Page record
			this.props
				.getPage(recordId)
				.then(res => {
					for (let k of Object.keys(res)) {
						this.props.change(k, res[k]);
					}
				})
				.catch(err => {});
		}
	}

	submitHandler = values => {
		const { error } = this.state;
		console.warn('submitHandler', values);

		this.props
			.savePage(values)
			.then(res => {
				window.location.href = '/admin/pages';
			})
			.catch(err => {
				console.warn('submit Err', err);
				const errName = err.data.error.codeName;
				const dbErr = err.data.error.name;

				if(dbErr)   this.setState({ error: `Error: ${err.data.error.errmsg}`  });
				if(errName) this.setState({ error: `Error: ${errName}` });
			});
	};

	onDeleteRecordEvent = () => {
		const { formValues } = this.props;
		const recordId = formValues._id;
		this.props
			.deletePage(recordId)
			.then(res => {
				window.location.href = '/admin/pages';
			})
			.catch(err => {});
	};

	deleteImageFile = () => {
		const { formValues } = this.props;

		// Add to deleteFiles form param
		this.deleteFile(formValues.image);
		this.props.change('image', '');
	};

	deleteFile = filePath => {
		const { formValues } = this.props;
		let deleteFilesArr = formValues.deleteFiles || [];
		deleteFilesArr.push(filePath);
		this.props.change('deleteFiles', deleteFilesArr);
	};

	onImageRemovedEvent = img => {
		console.log('onImageRemovedEvent', img);
		this.deleteFile(img);
	};

	render() {
		const { handleSubmit, mode, formValues } = this.props;
		const { error } = this.state;

		return (
			<div className="card-content  ">
				<form onSubmit={handleSubmit(this.submitHandler)}>
					<div className="row">
						{error && <div className="red-text col s12">{error}</div>}

						<div className="col s12">
							<Field name="title" disabled={mode == 'view' ? true : false} component={inputFieldTempl} label="title" placeholder="Заголовок" />
							<ImageUpload {...this.props} label="Main Image" deleteImageFile={this.deleteImageFile} />
							<Field
								name="description"
								component={CKEditor}
								counter="true"
								onImageRemovedEvent={this.onImageRemovedEvent}
								label="Description"
								placeholder="Description here ..."
								value={formValues.description}
							/>

							<Field name="showOnMenu" component={InputCheckbox} label="show On Menu" />
							<Field name="showOnFront" component={InputCheckbox} label="show On Front page" />
						</div>
					</div>

					<FormActions {...this.props} onDeleteRecordEvent={this.onDeleteRecordEvent} />
				</form>
			</div>
		);
	}
}

const FormActions = props => {
	const { mode, onDeleteRecordEvent } = props;

	return (
		<div className="col s12" style={{ marginTop: '20px' }}>
			{mode == 'edit' && (
				<a onClick={onDeleteRecordEvent} className="btn btn-small right red lighten-1">
					<i className="material-icons" style={{ verticalAlign: 'sub' }}>
						delete
					</i>
					Delete
				</a>
			)}

			<button type="submit" onClick={e => console.log('Submit cl')} className="btn btn-small right" style={{ margin: '0 5px' }}>
				<i className="material-icons" style={{ verticalAlign: 'sub' }}>
					check
				</i>
				Save
			</button>

			<a onClick={e => Router.back()} className="btn btn-small right">
				<i className="material-icons" style={{ verticalAlign: 'sub' }}>
					close
				</i>
				Exit
			</a>
		</div>
	);
};

function validate(values) {
	const errors = {};

	if (values && !values.title) errors['title'] = 'Title cannot be empty';
	return errors;
}

const ImageUpload = props => {
	const { formValues, deleteImageFile, label } = props;

	return (
		<div className="">
			<label style={{ float: 'left', display: 'block', width: '100%', marginBottom: '10px' }}>{label}</label>
			{formValues.image && (
				<Fragment>
					<img src={formValues.image} style={{ width: '200px' }} />
					<i className="material-icons red-text" onClick={deleteImageFile}>
						delete_forever
					</i>
				</Fragment>
			)}
			{!formValues.image && (
				<Fragment>
					<Field name="upload_file[image]" component={FileUploadButton} label="Images" placeholder="Images" />
				</Fragment>
			)}
		</div>
	);
};

/** Redux-Form wrapper **/
PageForm = reduxForm({
	form: 'PageForm',
	validate: validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false
})(PageForm);

function mapStateToProps(state, ownProps) {
	const { mode, record } = ownProps;

	let initialValues = {};
	const formValues = getFormValues('PageForm')(state) || {};
	return { initialValues, formValues };
}

export default connect(mapStateToProps, { getPage, savePage, deletePage })(PageForm);
