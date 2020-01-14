var passport = require('passport');
var User = require('../../../db/models/User');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

/*
* populate req.user data
* */
passport.deserializeUser(function (id, done) {
    User.findById({_id:id})
        .exec(function(err, user) {
            done(err, user);
        });
});


// load passport strategies
const localSignupStrategy = require('./local.signup');
const localLoginStrategy = require('./local.signin');
passport.use('local.signup', localSignupStrategy);
passport.use('local.signin', localLoginStrategy);


module.exports = passport;