const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../../config') ;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {

    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim(),
    };

    User.findOne({'email': userData.email},  (err, user)=> {

        if (err) {
            // console.log('>> findOne err', err);
            return done(err);
        }
        if (user) {
            // console.log('>> findOne user', user);
            // return done(null, false, {message: 'Email is already in use.'});
            return done({message: 'Account exist. Please, Log In.'});
        }
        let newUser = new User(userData);


        newUser.save((err, result) =>{
            if (err)  return done(err);

            // console.log('newUser', result);
            return done(null, newUser,  {message:"Hey"});
        });
    });

});