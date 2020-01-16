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
    let { filep  } = req.body;
    console.log('imageFromEditor:: file', req.files.file);


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

router.post("/deleteFile", async (req, res, next) => {
    let { filePath  } = req.body;

    if(!filePath || filePath.length<=5) res.status(500).send({error:'filePath error'});

    let result = await fileHelper.deleteFile(filePath)
        .then(res=>{
            return res.status(200).send({status:'success'});
        }).catch(err=>{
            return res.status(500).send({status:'error', err});
        });
    console.log("__ delete res", result);
});



module.exports = router;