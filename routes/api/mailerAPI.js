const express = require('express');
const router = express.Router();
const root_path = process.cwd();

// Set up connection to database
const db = require('../../db/db');
db.setUpConnection();

const { sendEmail } = require('../../utils/Mailer/mailer');

// MSG to admin/owner
router.post('/contactMsg', async (req, res, next) => {
	let { subject, message, userEmail } = req.body;
	const emailFrom = userEmail;

	// Required fields
	if (!subject || !message) return res.status(500).send({ error: 'Required fields cannot be empty' });

	const request = await sendEmail({
		emailTo: process.env.ADMIN_EMAIL,
		emailFrom: emailFrom,
		subject,
		message,
		locals: { footer: `My Email: ${emailFrom}` }
	});

	if (request.success == true) {
		return res.status(200).send({ status: 'Success' });
	} else {
		return res.status(500).send({ error: 'Server Error' });
	}
});

module.exports = router;
