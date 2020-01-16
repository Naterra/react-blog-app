const request = require('request');
const fs = require('fs');
const rimraf = require('rimraf');
const root_path = process.cwd();
const config = require("../config");


const getImageRealPath=(imageUrl)=>{
    return new Promise(resolve=>{
        request(imageUrl, (err, res, body)=> {
            if(err) console.log('>>> err', err);
            resolve('https://'+res.req.socket._host + res.req.path);
        });
    });
};

const getFilesizeInBytes = (filename) =>{
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
};

const getFolderImages = (folderPath)=>{
    return new Promise(resolve=>{
        let res=[];
        fs.readdir(folderPath, function(err, items) {
            // console.log('items', items);

            for (let i=0; i<items.length; i++) {
                let filePath =folderPath+items[i] ;

                res.push({
                    name: filePath,
                    size: getFilesizeInBytes(filePath),
                    buferLength: fs.readFileSync(filePath).length
                });
            }
            resolve(res);
        });
    });
};

const downloadIfNotExist = (uri, filename, folderImages) => {
    //TODO:save only image names!!!
    //https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
    return new Promise(resolve=>{
        request.head(uri, function(err, res, body){
            // console.log('content-type:', res.headers['content-type']);
            // console.log('content-length:', res.headers['content-length']);

            // check if file exist in place folder
            let imageExist=false;
            for(let img of folderImages){
                // console.log(` img.size=${img.size} size in stream=${res.headers['content-length']}`);
                if(img.size ==res.headers['content-length']) imageExist=true;
            }


            // Save if not exist
            if(!imageExist){
                // console.log('>>> NOT EXIST ', filename);
                let stream =request(uri);
                stream.pipe(fs.createWriteStream(filename))
                    .on('close', ()=>resolve(true));
            }else{
                // console.log('>>> FILE EXIST', filename);
                resolve(false);
            }
        });
    });
};

const downloadFromURL = (uri, filename) => {
    //https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
    return new Promise(resolve=>{
        request.head(uri, function(err, res, body){
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            //TODO: check if file exist in place folder
            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on('close', ()=>resolve(true));
        });
    });
};

const getFileExt=(mimetype)=>{
    // console.log('______ mimetype ____', mimetype);
    if(mimetype=='image/png') return 'png';
    if(mimetype=='application/pdf') return 'pdf';
    return 'jpg';
};

const _calcFilePath =(filePath)=>{
    const substr ='uploads/';

    //remove / on beginig of path
    if(filePath[0]=='/') filePath = filePath.substring(1);

    // calc shift and new path
    const idxOf = filePath.indexOf(substr);
    let shift = idxOf >=0 ? substr.length + idxOf : 0;
    let pathOfFile = filePath.substring(shift);
    let pathToUploadFile =  root_path+'/public/uploads/'+pathOfFile;
    return pathToUploadFile;
};

/**
 * Creates folders by provided filePath
 * > path must contain 'public/uploads' to be valid
 * > creates folders only under 'public'
 * @param filePath (str) folder path
 * @private
 */
const _createFoldersIfNotExist =(filePath)=>{
    // Create system filders if not exists
    if (!fs.existsSync(root_path+"/public")) fs.mkdirSync(root_path+"/public");
    if (!fs.existsSync(root_path+"/public/uploads")) fs.mkdirSync(root_path+"/public/uploads");

    // Remove root path from filePath
    let idxOf = filePath.indexOf(root_path);
    if(idxOf >=0){
        let shift = root_path.length + idxOf;
        filePath = filePath.substring(shift);
    }


    // contain 'public/uploads' ?
    // Remove public/uploads from filePath
    const uploadPath = 'public/uploads/';
     let idxOfSubpath = filePath.indexOf(uploadPath);
     if(idxOfSubpath >=0){
         shift = uploadPath.length + idxOfSubpath;
         filePath = filePath.substring(shift);
     }



    let folderPathArr = filePath.split('/');
    // console.log('_createFoldersIfNotExist ___folderPathArr', { root_path, folderPathArr, idxOfSubpath  });

    let sysPath = root_path+'/'+uploadPath;

    for(let path of folderPathArr){
        if(path !==''){
            sysPath +=path+'/';

            // Make dir if not exist
            if (!fs.existsSync(sysPath)){
                console.log('>> NEW FOLDER path', sysPath);
                fs.mkdirSync(sysPath);
            }
        }
    }
};

const download = (param, options={}) => {
    const { file, folder } =param;

    let filename =  options.keepOriginalName ? file.name : `${Date.now()}.${getFileExt(file.mimetype)}` ;

    // Calc filePath path under root path
   const filePath = _calcFilePath(folder);

    // Make folders if not exists
    _createFoldersIfNotExist(filePath);

    //Calc App public folder path
   let appFolderPath = filePath.replace(root_path, '');
   appFolderPath = appFolderPath.replace('public/', '');

    // console.log('>> filePath >> ', {filePath, appFolderPath});

    return new Promise(resolve=>{
        // Use the mv() method to place the file somewhere on your server
        file.mv(`${filePath}/${filename}` , (err, data) =>{
            if (err){
                // console.log('writeFile err', err);
                reject({
                    "uploaded": false,
                    "error": {
                        "message": "could not upload this image"
                    }
                });
            }else{
                // console.log('writeFile data', data);
                resolve({
                    "uploaded": true,
                    "filePath": `${appFolderPath}/${filename}`
                });
            }
        });
    });
};


const deleteFile = (filePath)=>{
    let substr ='public/uploads/';
    let substrLength = substr.length;
    let shift = substrLength + filePath.indexOf(substr);


    return new Promise((resolve, reject)=>{
        if(!filePath.includes(substr)) return reject({error:'Wrong file path'});
        if(!filePath) return reject({error:'Missed parameter: filePath '});
        if( typeof(filePath) != 'string') return reject({error:'filePath is not a string', path:filePath});

        let pathOfFile = filePath.substring(shift);
        let pathToDeleteFile =  root_path+'/public/uploads/'+pathOfFile;
        console.log("___pathToDeleteFile", pathToDeleteFile);

        fs.unlink(pathToDeleteFile, (err, res)=>{
            if(err) return reject({error:err});
            resolve({success:true});
        });
    });
};


/**  used by CKEditor */
// const downloadFile =(file, subfolder=false) => {
//     //TODO: remove and use download FN instead
//     // console.log(">>> downloadFile FN", file);
//
//     let folderPath = root_path+'/static/uploads/ckeditor';
//     let publicPath = config.SERVER_URL+'/static/uploads/ckeditor';
//     if(subfolder){
//         folderPath = `${folderPath}/${subfolder}`;
//         publicPath = `${publicPath}/${subfolder}`;
//     }
//
//     const getFileExt=(mimetype)=>{
//         if(mimetype=='image/png') return 'png';
//         return 'jpg';
//     };
//
//     return new Promise((resolve, reject)=>{
//         // Make dir if not exist
//         if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
//         const timestamp = Date.now();
//         const filename = `${timestamp}.${getFileExt(file.mimetype)}`;
//         let newSystFile = `${folderPath}/${filename}`;
//         let newPublicFile = `${publicPath}/${filename}`;
//
//         // Use the mv() method to place the file somewhere on your server
//         file.mv(newSystFile , (err) =>{
//             if (err){
//                 reject({
//                     "uploaded": false,
//                     "error": {
//                         "message": "could not upload this image"
//                     }
//                 });
//             }else{
//                 resolve({
//                     "uploaded": true,
//                     "url": newPublicFile
//                 });
//             }
//         });
//     });
// };

const deleteFolderRecursivelly =(folderPath)=>{
    if(!folderPath) return false;

    let substr ='static/uploads/';
    let substrLength = substr.length;
    let shift = substrLength + folderPath.indexOf(substr);
    let newFPath = folderPath.substring(shift);

    // Remove Set folder
    let folder= `${root_path}/public/uploads/${newFPath}`;
    // console.log("___RM "+folder);

    return rimraf.sync(folder);
};


module.exports ={
    getImageRealPath : getImageRealPath,
    getFolderImages : getFolderImages,
    getFilesizeInBytes : getFilesizeInBytes,
    downloadIfNotExist : downloadIfNotExist,
    downloadFromURL,
    download : download,
    deleteFolderRecursivelly,
    deleteFile,
};