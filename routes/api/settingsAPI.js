const express = require('express');
const router = express.Router();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();


// Models
const Settings = require('../../db/models/Settings');




router.get("/", async (req, res) => {
    const { name } = req.query;

    Settings.findOne({name: name}, (err, data) => {
        if (err) {
            console.log(err, "err");
            return res.send(err);
        }else{
            console.log(">>> success data", data);
            return res.send(data);
        }
    });
});

router.post("/", async (req, res, next) => {
    const {name, param} = req.body;
    if(!name) return res.send(500, { error: 'Settings name is required' });
    let newData = { name, param  };
    console.log('>> newData', newData);


    Settings.findOneAndUpdate({name:name}, newData, {new: true, upsert: true},  (err, doc)=>{
        if (err) {
            console.log('POST err', err);
            return res.send(500, { error: err });
        }else{
            console.log('POST success', doc);
            return res.send(doc);
        }
    });
});

// router.put("/", async (req, res, next) => {
//     const {name, param} = req.body;
//
//
//     // let setting = await Settings.findOne({name: name});
//     // console.log(">>> setting", setting);
//     let newData={
//         param:param
//     };
//     Settings.findOneAndUpdate({name:name}, newData, {new: true}, function(err, doc){
//         if (err) {
//             return res.send(500, { error: err });
//         }else{
//             console.log(">>> succesfully saved", doc);
//
//             return res.send("succesfully saved");
//         }
//
//     });
// });





module.exports = router;