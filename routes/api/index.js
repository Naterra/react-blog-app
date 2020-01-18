const express = require('express');
const router = express.Router();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();

// Routes
router.use('/auth', require('./authAPI'));
router.use('/user', require('./userAPI'));
router.use('/users', require('./usersAPI'));
router.use('/fs', require('./filesystemAPI'));
router.use('/settings', require('./settingsAPI'));
router.use('/pages', require('./pagesAPI'));
router.use('/mailer', require('./mailerAPI'));

module.exports = router;
