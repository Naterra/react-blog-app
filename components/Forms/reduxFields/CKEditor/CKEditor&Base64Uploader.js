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

// import FileRepository from '@ckeditor/ckeditor5-upload/src/filerepository';
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
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";




const loadPlugins = [ Base64UploadAdapter, Essentials, Paragraph, Bold, Italic, Heading, Indent, IndentBlock, Underline, Strikethrough, BlockQuote, Font, Alignment, List, Link, MediaEmbed, PasteFromOffice, Image, ImageStyle, ImageToolbar, ImageUpload, ImageResize, Base64UploadAdapter, Table, TableToolbar, TextTransformation ];

class CKEditorWrapper extends Component{
    render() {
		const {   input: { value, onChange }, label, meta: { touched, error, warning } } = this.props;
		// console.log('CK', this.props);

		return (
			<Fragment>
				<label>{label || 'll'}</label>
				<CKEditor
					editor={ClassicEditor}
					data={value}
					onChange={(event, editor) => {
						let data = editor.getData();
						onChange(data);
					}}
					onInit={editor => {
						// console.error("CKEditorWrapper::onInit", this);
					}}
					config={{
						plugins:loadPlugins,
						toolbar: [  "heading", "|", "bold", "italic", "underline", "strikethrough", "|", "fontSize", "fontColor",	"fontBackgroundColor", "|", "alignment", "outdent",	"indent", "bulletedList", "numberedList", "blockQuote",	"|", "link", "insertTable",	"imageUpload", "mediaEmbed", "|", "undo", "redo"],
						image: {
							resizeUnit: "px",
							toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:full', 'imageStyle:alignRight', 'imageStyle:center-thumb-200', 'imageStyle:center-thumb-150'
							],
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

export default CKEditorWrapper;
