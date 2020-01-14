const axios  = require('axios');
const jwt = require('jsonwebtoken');


const express = require('express');
const router = express.Router();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();

// Models
const User = require('../../db/models/User');

// Helper
const fileHelper = require('../../utils/fileHelper');


/** Utils **/
const { sendInviteEmail, sendVerifyEmailEmail, testEmail } = require('../../utils/Mailer/mailer');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(403).json({error: 'Must be signed in to get profile'})
};





router.get('/list', (req, res, next)=>{
    const {  } = req.query;
    console.log("__GET__ api/teachers params", req.query);

   let find={};



    User.find(find)
        .exec((err, doc)=>{
            if (err) return res.status(400).send({error: 'Неправильный API запрос'});

            // console.log(">>> doc", doc);
            return res.send(doc);
        });
});






router.post("/userAvatar", async (req, res, next) => {
    const {  userId } = req.body;
    let file = req.files.file;
    if(!file) return res.send(500, { error: "File not found" });

    // let result = await fileHelper.downloadFile(file, userId);
    // return res.send(result);
});


router.post('/verifyEmailWithToken', async(req, res) => {
    // const { token } = req.body;
    //
    // jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    //     console.error("token:decoded", decoded);
    //     if(err) return res.status(400).send({error: 'Неправильный токен'});
    //
    //     let user = await User.findOne({ email: decoded.email });
    //     let invite = await Invitation.findOne({ token });
    //
    //     if(!invite && !user) return res.status(404).send({error: 'Ваше приглашение не найдено.'});
    //     if(!invite && user) return res.status(200).send({success:true, msg: 'Ваше приглашение уже активированно.'});
    //     if(!user) return res.status(400).send({error: 'Пользователь не найден'});
    //
    //     // Update User and remove invite
    //     if(invite && user){
    //         console.log('>>> invite record', JSON.stringify(invite));
    //
    //
    //         // Update User
    //         user.status = 1;
    //         user.emailVerified = true;
    //         user.save();
    //
    //         return res.send({success:true, msg:"Email подтвержден"});
    //     }
    // });

});






/***  Must be at the end of file  ***/
// Expose a route to return user profile if logged in with a session
router.get('/:id', (req, res) => {
    const id = req.params.id;
    // if(!id) return res.status(400).send({error: 'Ошибка параметров'});
    //
    // User.findOne({_id: req.user._id})

});

// UPDATE User
router.put('/:id', async(req, res) => {
    const { id } = req.params;
    const {  name, image} = req.body;

   let user = await User.findOne({_id:id});

   if(user && user._id){
       user.name = name;
       user.image = image;

       user.save((err, record)=>{
           if(err) return res.status(500).json({error: 'User update error'});

           return res.send(record);
       });
   }
});

// Expose a route to allow users to delete their profile.
router.delete('/:id', (req, res) => {
    // if (req.user) {
    //     User.remove(req.user.id)
    //         .then(() => {
    //             // Destroy local session after deleting account
    //             req.logout()
    //             req.session.destroy(() => {
    //                 // When the account has been deleted, redirect client to
    //                 // /auth/callback to ensure the client has it's local session state
    //                 // updated to reflect that the user is no longer logged in.
    //                 // return res.redirect(`/auth/callback?action=signout`)
    //             })
    //         })
    //         .catch(err => {
    //             return res.status(500).json({error: 'Unable to delete profile'})
    //         })
    // } else {
    //     return res.status(403).json({error: 'Must be signed in to delete profile'})
    // }
});

module.exports = router;