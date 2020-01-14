const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../../../config') ;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		session: true,
		passReqToCallback: true
	},
	(req, email, password, done) => {

		const userData = {
			email: email.trim(),
			password: password.trim()
		};

		User.findOne({ email: userData.email })
			.exec((err, user) => {

			if (err) {
				return done(err);
			}

            if (!user) {
                const error = new Error('Incorrect email or password');
                error.name = 'IncorrectCredentialsError';

                // return done(null, false, error); not working call
                return done(false, error);
            }


			// check if a hashed user's password is equal to a value saved in the database
			return user.comparePassword(userData.password, (passwordErr, isMatch) => {
				if (!isMatch) {
					const error = new Error('Incorrect email or password');
					error.name = 'IncorrectCredentialsError';

					return done(null, false, error);
				}

				const payload = {
					sub: user._id
				};

				// create a token string
				const token = jwt.sign(payload, config.jwtSecret);
				const data = {
					name: user.name
				};

				// return done(null, token, data);
				return done(null, user, token);
			});
		});
	}
);
