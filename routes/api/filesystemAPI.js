const fs = require('fs');
const root_path = process.cwd();

// Router
const express = require('express');
const router = express.Router();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();

// Helper
const fileHelper = require('../../utils/fileHelper');

router.post("/imageFromEditor", async (req, res, next) => {
    let { filePath  } = req.body;

    if(!req.files) return res.send(500, { error: "Файл не найден" });
    let file = req.files.file;
    let result = await fileHelper.download({
        file,
        folder:`/ckeditor`
    });
    result.url = result.filePath;
    //TODO: check fn responsible for path
    return res.send(result);
});

// router.post("/deleteFile", async (req, res, next) => {
    // let { filePath  } = req.body;
    //
    // let substr ='static/uploads/';
    // let substrLength = substr.length;
    // let shift = substrLength + filePath.indexOf(substr);
    //
    // if(!filePath.includes(substr)){
    //     return res.send(500, {error:'Wrong file path'});
    // }
    //
    // let pathOfFile = filePath.substring(shift);
    // let pathToDeleteFile =  root_path+'/static/uploads/'+pathOfFile;
    // console.log("___pathToDeleteFile", pathToDeleteFile);
    //
    //
    // fs.unlink(pathToDeleteFile, (err, res)=>{
    //     if(err) return res.send(500, {error:err});
    //     return res.send({success:true});
    // });
// });



module.exports = router;