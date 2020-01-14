const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();

// Models
const User = require('../../db/models/User');




router.get('/', (req, res, next)=>{
    const { } = req.query;
   let findQuery={};


    User.find(findQuery)
        .exec((err, doc)=>{
            if (err) return res.status(400).send({error: 'Неправильный API запрос'});
            return res.send(doc);
        });
});




module.exports = router;