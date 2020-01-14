// Load environment variables from a .env file if one exists
require('dotenv').load();
const path = require('path');

// Use Node Mailer for email sign in
const config = require('../../config');

const nodemailer = require('nodemailer');
const nodemailerSmtpTransport = require('nodemailer-smtp-transport');
const nodemailerDirectTransport = require('nodemailer-direct-transport');



// const transport =()=>{
// 	if(process.env.EMAIL_SERVER && process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD){
// 		return nodemailerSmtpTransport({
// 			host: process.env.EMAIL_SERVER,
// 			port: process.env.EMAIL_PORT || 25,
// 			secure: true,
// 			auth: {
// 				user: process.env.EMAIL_USERNAME,
// 				pass: process.env.EMAIL_PASSWORD
// 			}
// 		});
// 	}else{
// 		// Send email direct from localhost if no mail server configured
// 		return nodemailerDirectTransport();
// 	}
// };

const transporter = nodemailer.createTransport({
	host: process.env.EMAIL_SERVER,
	port: process.env.EMAIL_PORT || 25,
	secure: true, // use SSL
	auth: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD
	}
});

const EmailTempl = require('email-templates');

const EmailOptions ={
	// message:{ from:"service@hotmail.com", sender: 'service@gmail.com', },
	send: true,
	preview: false,
	htmlToText: false,
	transport: transporter,
	juice: true,
	juiceResources: {
		preserveImportant: true,
		webResources: {
			relativeTo: path.join(__dirname, '..', 'css')
		}
	},
	views: {
		options: { extension: 'ejs' }
	}
};

const emailService = new EmailTempl(EmailOptions);




const sendVerifyEmail = email => {
	return new Promise((resolve, reject) => {
		if (!email) reject({ error: 'Email Parameters Error' });
		const url = `${config.SERVER_URL}/auth/verify-email?email=${email}`;

		emailService
			.send({
				template: path.join(__dirname,  'email-templates', 'verifyEmail'),
				message: {
					to: email
				},
				locals: { url }
			})
			.then(res => {
				resolve({ success: true });
			})
			.catch(err => {
				console.log('>> sendVerifyEmail rejected', err);
				reject({ error: 'Server Error' });
			});
	});
};

const sendEmail = (param) => {
	const { emailTo, emailFrom, subject, message, locals } = param;

	// const opt = Object.assign({}, EmailServOptions, {message:{from:emailFrom}});
	// console.log('>>> OPT', opt);
	// const sServ = new EmailTempl(opt);

	return new Promise((resolve, reject) => {
		if (!emailTo) reject({ error: 'Email Parameters Error' });

		console.log('>>> emailService', emailService);


		emailService
			.send({
				template: path.join(__dirname,  'email-templates', 'defaultTemplate'),
				message: {
					sender: 'test@gmail.com',
					from: 'niftylettuce+test@gmail.com',
					to: emailTo
				},
				locals: Object.assign({ subject, message }, locals)
			})
			.then(res => {
				resolve({ success: true });
			})
			.catch(err => {
				console.log('>> sendEmail rejected', err);
				reject({ error: 'Server Error' });
			});

		//Old Solutions
		// nodemailer
		// 	.createTransport(nodemailerTransport)
		// 	.sendMail({
		// 		to: email,
		// 		from: process.env.EMAIL_FROM,
		// 		subject: 'Sign in link',
		// 		text: `Use the link below to sign in:\n\n${url}\n\n`,
		// 		html: `<p>Use the link below to sign in:</p><p>${url}</p>`
		// 	}, (err) => {
		// 		if (err) {
		// 			console.error('Error sending email to ' + email, err)
		// 		}
		// 	})

	});
};

module.exports = {
	sendEmail,
	sendVerifyEmail
};
