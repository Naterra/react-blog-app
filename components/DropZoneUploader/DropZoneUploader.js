import React, { Fragment, Component, useMemo, useCallback, useEffect, useState } from 'react';
import Dropzone, {useDropzone} from 'react-dropzone';


const baseStyle = {};
const activeStyle = { borderColor: '#2196f3'};
const acceptStyle = { borderColor: '#00e676'};
const rejectStyle = { borderColor: '#ff1744'};




const DropZoneUploader =(props)=>{
    const { input } =  props;


    const maxSize = 1048576*7; //5MB
    const [files, setFiles] = useState([]);


    const getTitle=(str)=>{
        let arr = str.split('.');
        arr.pop();
        let title = arr.join(' ');
        title = title.replace(/[ ,_-]/g, ' ');
        return title;
    };

    const onDrop = (acceptedFiles) => {
        // console.log('onDrop', acceptedFiles);

        setFiles(acceptedFiles.map(file => {
            return Object.assign(file, {
                preview: URL.createObjectURL(file),
                imgTitle: getTitle(file.name)
            });
        }));
    };

    useEffect( () => {
        // console.warn('useEffect', {files, input} );
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
        if(input ){
            input.onChange(files);
        }
    }, [files]);


    const { isDragActive, isDragAccept,isDragReject, getRootProps, getInputProps, acceptedFiles, rejectedFiles } = useDropzone({
        onDrop,
        accept: 'image/png, image/jpeg, image/gif',
        minSize: 0,
        maxSize,
        multiple:true
    });

    const onTitleChanged=(e)=>{
        // console.log('onTitleChanged', e.target);
        let idx = e.target.id;
        let val = e.target.value;

        //Change Val
        files[idx].imgTitle = val;
        // files[idx].name = val;

        setFiles(files.map(file =>  file));
    };


    const thumbs = files.map((file, idx) => (<div  key={idx} style={{width:'100%', display:'flex'}}>
        <div className='thumb'>
            <div className='thumbInner'>
                <img className='tumbs' src={file.preview} />
            </div>
        </div>

            <input type="text" id={idx} onChange={onTitleChanged} value={file.imgTitle} style={{border: '1px solid #eee', background: '#fff'}} autoComplete="off" />
        </div>
    ));

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject
    ]);

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;



    return (
        <div className="DropZoneUploader">
            <div className="container2" {...getRootProps(style)}>
                <input {...getInputProps()} />
                {!isDragActive && 'Click here or drop a file to upload!'}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && <span className='red-text'>File type not accepted, sorry!</span>}
                {isFileTooLarge && <div className="red-text s6">File is too large. </div>}
            </div>

            <aside className="thumbsContainer" >
                {thumbs}
            </aside>
        </div>
    );
};




export default DropZoneUploader;