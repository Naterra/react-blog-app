//https://nagui.me/javascript/nextjs9_ckeditor5/custom_build/

/**
 *
 *
 * Example of Redux Filed:
 * 	<Field name="description"
 *     component={CKEditor}
 *     counter="true"
 *     onChange={e=>{console.log('changed')}}
 *     label="Description" placeholder="Description here ..."
 *     value={formValues.description}
 *   />
 */

import React, { Component, Fragment } from 'react';
import axios from 'axios';


import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';


const loadPlugins = [FileRepository, Essentials, Paragraph, Bold, Italic, Heading, Indent, IndentBlock, Underline, Strikethrough, BlockQuote, Font, Alignment, List, Link, MediaEmbed, PasteFromOffice, Image, ImageStyle, ImageToolbar, ImageUpload, ImageResize, Table, TableToolbar, TextTransformation ];

class CKEditorWrapper extends Component{
	constructor(){
		super();
		this.state={
			images:[]
		}
	}
	componentDidMount() {
		const {   input: { value, onChange }  } = this.props;
		if(value != ''){
			const imagesArr = this.getImagesFromText(value);
			this.setState({images:imagesArr});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		const {   input: { value, onChange }  } = this.props;
		const { images } = this.state;
		// console.error('CDU', this.props);
		// console.error('CDU prevProps', prevProps);

		// When Text Loaded
		if(prevProps.input.value =='' && value.length>0 && images.length<=0){
			// console.error('Loaded and no images');
			const imagesArr = this.getImagesFromText(value);
			this.setState({images:imagesArr});
		}
	}

	getImagesFromText=(text)=>{
		const imagesArr = Array.from( new DOMParser().parseFromString( text, 'text/html' )
			.querySelectorAll( 'img' ) )
			.map( img => img.getAttribute( 'src' ) );
		return imagesArr;
	};

	getRemovedImage=(text)=>{
		const { images } = this.state;
		const textImagesArr = this.getImagesFromText(text);
		const initialImages = images;



		let removedImg = null;
		for(let img of initialImages ){
			if(!textImagesArr.includes(img)){
				removedImg = img;
			}
		}
		return removedImg;
	};

	removeFromServer=(imgSrc)=>{
		const {   onImageRemovedEvent  } = this.props;
		// console.log('removeFromServer', this.props);

		// Must be processed from paren Form component
		if(onImageRemovedEvent){
			onImageRemovedEvent(imgSrc);
		}
	};

    render() {
		const {   input: { value, onChange }, meta: { touched, error, warning } } = this.props;
		const { images } = this.state;
		// console.log('initialImages', images);

		return (
			<Fragment>
				<CKEditor
					editor={ClassicEditor}
					data={value}
					onChange={(event, editor) => {

						//If Image removed event
						const changes = event.source.differ.getChanges();
						const removedImageEvent = changes.find(item=>item.type == 'remove' && item.name == 'image');
						if(removedImageEvent){
							// console.log('onChange::IMAGE removed', removedImageEvent);
							// const modelElement = removedImageEvent.position.nodeAfter;

							// TODO: remove from server or use something like ckfinder
							const rImg = this.getRemovedImage(editor.getData());
							this.removeFromServer(rImg);
							console.log('removedImg', rImg);
						}


						let data = editor.getData();
						onChange(data);
					}}

					onInit={editor => {
						console.error("CKEditorWrapper::onInit", editor);

						editor.plugins.get('FileRepository').createUploadAdapter = loader => {
							console.error("createUploadAdapter");
							return new UploadAdapter(loader);
						};
					}}

					config={{
						plugins:loadPlugins,
						toolbar: [  "heading", "|", "bold", "italic", "underline", "strikethrough", "|", "fontSize", "fontColor",	"fontBackgroundColor", "|", "alignment", "outdent",	"indent", "bulletedList", "numberedList", "blockQuote",	"|", "link", "insertTable",	"imageUpload", "mediaEmbed", "|", "undo", "redo"],
						image: {
							resizeUnit: "px",
							toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:full', 'imageStyle:alignRight'	],
							styles: [
								'full',
								'side',
								'alignLeft',
								'alignCenter',
								'alignRight',
								// { name: 'center-thumb-200', icon: 'center', title: 'Center thumb 200', className: 'image-style-align-center thumb-200' },
							],
						},
						autoParagraph: false

					}}
				/>
			</Fragment>
		);
	}
}

class UploadAdapter {
	constructor(loader) {
		// Save Loader instance to update upload progress.
		this.loader = loader;
	}

	upload() {
		console.error('Adapt:upload', this.loader.file);

		return this.loader.file.then(uploadedFile => {
			return new Promise((resolve, reject) => {
				const data = new FormData();
				data.append('file', uploadedFile);

				axios
					.post('/api/fs/imageFromEditor', data, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
					.then(res => {
						// console.warn('upload then', res);
						if(!res.data.url) throw new Error('Image Upload API response in wrong format ');
						if (res.data) {
							let resData = res.data;
							resData.default = resData.url;
							resolve(resData);
						} else {
							reject({ error: 'API error' });
						}
					})
					.catch(error => {
						// console.log(error);
						reject(error);
					});
			});
		});
	}

	abort() {
		// Reject promise returned from upload() method.
	}
}

export default CKEditorWrapper;
