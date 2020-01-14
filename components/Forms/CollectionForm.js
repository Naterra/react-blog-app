import React, { Fragment, Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';



/** Components **/
// import {  Textarea,  inputFieldTempl}  from './reduxFields';
import textareaFieldTempl from './reduxFields/textareaFieldTempl';
import inputFieldTempl from './reduxFields/inputFieldTempl';
import selectFieldTempl from './reduxFields/selectFieldTempl';
import DropZoneUploader from '../DropZoneUploader/DropZoneUploader';


/**  Actions  **/
import { saveCollection, deleteCollection } from '../../store/actions';
import FileUploadButton from "./reduxFields/FileUploadButton/FileUploadButton";

class CollectionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: false
		}
	};

	componentWillUnmount() {
		this.props.reset();
	}


	submitHandler = (values) =>{
		const { onSaveCallback, mode } = this.props;
		const { error } = this.state;
		console.warn("submitHandler", values);

		this.props
			.saveCollection(values)
			.then(res => {
				console.warn("SAVE res", res);
				onSaveCallback(res, mode);
			})
			.catch(err => {
				const errName = err.data.error.codeName;
				console.warn("SAVE err", err);

				if(errName){
					if(errName =='DuplicateKey'){
						this.setState({error: 'Error: '+errName});
					}
				}else{
					this.setState({error: 'Error: '+err.data.error});
				}
			});
	};

	onDeleteRecordEvent = (record) => {
		const { formValues, onDeleteCallback } = this.props;
		const recordId = formValues._id;

		//Validation
		if(!record || !record._id) throw new Error("onDeleteRecordEvent: lost record data");

		this.props.deleteCollection(recordId)
			.then(res=>{
				console.warn("DELETE res", res);
				onDeleteCallback(record);
			})
			.catch(err=>{});
	};

	deleteImgeEvent=(imageIdx)=>{
		const { formValues } = this.props;
		// console.log('deleteImgeEvent', imageIdx);
		// console.log('images', formValues.images);
		let images = formValues.images;
		let removed =images.splice(imageIdx, 1);


		// Add to deleteFiles form param
		this.deleteFile(removed[0].path);
		// update
		this.props.change('images', images);
		this.forceUpdate();
	};

	deletePDFFile=()=>{
		const { formValues } = this.props;

		// Add to deleteFiles form param
		this.deleteFile(formValues.pdfFile);

		// update
		this.props.change('pdfFile', null);
		this.forceUpdate();
	};

	deleteFile = (filePath)=>{
		const { formValues } = this.props;
		let deleteFilesArr = formValues.deleteFiles || [];
		deleteFilesArr.push(filePath);
		// console.log('deletePDFFile', {filePath, deleteFilesArr });
		this.props.change('deleteFiles', deleteFilesArr);
	};

	render() {
		const { handleSubmit, mode, formValues } = this.props;
		const { error } = this.state;
		let modeTitle = mode == 'new' ? 'Create Collection' : (mode=='edit'? 'Edit Collection':'');

		const thumbs = formValues.images && formValues.images.map((file, idx) => (<div key={idx} style={{width:'100%', display:'flex'}}>
			<div className='col s12 m3 l2'>
					<div className='thumb' >
						<div className='thumbInner'>
							<img className='tumbs' src={file.path} />
						</div>
					</div>
				</div>

				<div className='col s12 m9 l10' style={{ alignSelf: 'flex-end'}}>
						<div className='col s10'>
							<Field name={`images[${idx}][title]`}  component={inputFieldTempl} label="Image Title" />
						</div>
						<div className='col s2'>
							<i className="material-icons red-text tiny" title='Delete Image' onClick={e=>this.deleteImgeEvent(idx)}>delete</i>
						</div>
				</div>
			</div>));



		return (<div className='card-content' style={{display: 'flex'}}>
						<form onSubmit={handleSubmit(this.submitHandler)}>
								<h3 style={{marginTop: '0'}}>{modeTitle}</h3>

								{error && (<div className='row'>
									{<div className="red-text">{error}</div>}
								</div>)}




										<div className="col s12">
											<Field
												name="title"
												label="Title"
												component={selectFieldTempl}
											>
												<option value="">----</option>
												<option value="Box Art">Box Art</option>
												<option value="Flyer">Flyer</option>
												<option value="Manual Instructions">Manual Instructions</option>
												<option value="PNG">PNG</option>
												<option value="Pictures">Pictures</option>
												<option value="Decals">Decals</option>
												<option value="Booklet">Booklet</option>
											</Field>
										</div>

										<div className="col s12">
											<Field name="description"  component={textareaFieldTempl} label="Description"   />
										</div>



										{/* PDF FILE */}
										<PdfFile formValues={formValues} deletePDFFile={this.deletePDFFile}/>




										<div className="DropZoneUploader" style={{float:'left', marginTop: '15px'}}>
											<aside className="thumbsContainer  " >
												{thumbs}
											</aside>
										</div>



										<div className="col s12">
											<Field name="upload_images"  component={DropZoneUploader} label="Upload Images"   />
										</div>


							<FormActions {...this.props} onDeleteRecordEvent={this.onDeleteRecordEvent} />
						</form>

			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) errors['title'] = 'Title cannot be empty';
	return errors;
}


/** Redux-Form wrapper **/
CollectionForm = reduxForm({
	form: 'CollectionForm',
	validate: validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: false
})(CollectionForm);


function mapStateToProps(state, ownProps) {
	const { mode, type, record } = ownProps;

	let initialValues = {
		setId: ownProps.setId
	};
	if(record) initialValues = record;

	const formValues = getFormValues('CollectionForm')(state) || {};
	return { initialValues, formValues };
}


const PdfFile=(props)=>{
	const {formValues, deletePDFFile} = props;

	return(<div>
		{formValues && formValues.pdfFile ?
			(<div className="col s12">
				<label style={{float: 'left', display: 'block', width: '100%', marginBottom: '10px'}}>PDF File</label>
				<a target='_blank' href={formValues.pdfFile}><i className="material-icons medium blue-text">picture_as_pdf</i></a>
				<i className="material-icons red-text" onClick={deletePDFFile}>delete_forever</i>
			</div>) :
			(<div className="col s12">
				<Field name="upload_pdf"  component={FileUploadButton} btnTitle="PDF file" placeholder="Images.." />
			</div>)}
	</div>);
};

const FormActions=(props)=>{
	const {formValues, mode, onDeleteRecordEvent} = props;

	return (<div className="col s12" style={{ marginTop: '20px' }}>
		{mode == 'edit' && (
			<a onClick={e=>onDeleteRecordEvent(formValues)} className="btn btn-small right">
				Delete
			</a>
		)}

		<button className="btn btn-small right" type="submit" style={{ margin: '0 5px' }}>
			Save
		</button>

	</div>);
};

export default connect(mapStateToProps, { saveCollection, deleteCollection })(CollectionForm);
