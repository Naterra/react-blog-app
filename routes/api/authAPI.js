const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();

const { sendVerifyEmail } = require('../../utils/Mailer/mailer');

// Models
const User = require('../../db/models/User');

router.get('/session', (req, res) => {
	if (req.user) {
		return res.send({ user: req.user });
	} else {
		return res.status(401).end();
	}
});

router.get('/authorized-user', (req, res, next) => {
	if (req.user) {
		return res.send({ user: req.user });
	} else {
		return res.status(401).end();
	}
});

router.post('/sign-up', (req, res, next) => {
	const {name, email, password} = req.body;
	let errors = [];
	if (!name) errors.push('Name cannot be empty');
	if (!email) errors.push('Email cannot be empty');
	if (email &&  email.length < 4) errors.push('Email too short');
	if (!password) errors.push('Password cannot be empty ');
	if (password &&  password.length < 4) errors.push('Password too short');

	if (errors.length > 0) {
		return res.status(400).send({ success: false, errors });
	}

	return passport.authenticate('local.signup', (err, userData) => {
		// console.log('API>local.signup', {err, userData });

		if (err) {
			return res.status(400).send({
				success: false,
				test: err,
				errors: err
			});
		}

		sendVerifyEmail(userData.email);

		return res.status(200).json({
			success: true,
			message: 'Authorized! Check your email '
		});
	})(req, res, next);
});

router.post('/sign-in', (req, res, next) => {
	if (req.user) {
		return res.status(200).json({
			success: true,
			message: 'Already authorized',
			user: req.user
		});
	}

	return passport.authenticate('local.signin', (err, userData, token) => {
		if (err) {


			if (err.name === 'IncorrectCredentialsError') {
				return res.status(400).json({
					success: false,
					message: 'Wrong credentials'
				});
			}

			return res.status(400).json({
				success: false,
				message: 'Wrong credentials'
			});
		}

		if (!userData) {
			return res.status(400).json({
				success: false,
				message: 'Wrong credentials'
			});
		}
		console.log('___ userData to LogIn', userData);
		req.logIn(userData, err => {
			if (err) {
				console.log('SignIn err', err);
				return res.status(400).json({
					success: false,
					message: "Error"
				});
			}

			return res.status(200).json({
				success: true,
				message: 'Success!',
				token,
				user: userData
			});
		});
	})(req, res, next);
});

router.get('/sign-out', (req, res, next) => {
	req.logout();
	res.redirect('/');
});

router.post('/verifyEmailAfterRegistration', async(req, res) => {
	const { email } = req.body;

	let user = await User.findOne({ email: email });

	if(user && user.emailVerified == true){
		return res.status(200).json({
			success: true,
			newUser: false,
			msg: 'Email verified. Please, Log In'
		});
	}

	if(user && user.emailVerified == false){
		console.log('>> email not verified', user);
		user.emailVerified = true;
		user.status = 1;
		user.save((err, data)=>{

			return res.status(200).json({
				success: true,
				newUser: true,
				msg: 'Email verified.'
			});

		});
	}else{
		return res.status(400).send({error: 'Please, Sign Up'});
	}
});

module.exports = router;
