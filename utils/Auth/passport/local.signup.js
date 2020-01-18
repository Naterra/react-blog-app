const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;


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
            return done(err);
        }
        if (user) {
             // return done(null, false, {message: 'Email is already in use.'});
            return done({message: 'Email is already in use.'});
        }
        let newUser = new User(userData);


        newUser.save((err, result) =>{
            if (err)  return done(err);
            return done(null, newUser,  {message:"Hey"});
        });
    });
});