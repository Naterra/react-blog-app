'use strict';
/**
 * https://github.com/pillarjs/path-to-regexp
 * ? - optional param '/:foo/:bar?'
 * /:slug(option1|option2) => '/:noname/:lang(en|es)/:wow+'
 * */

const next = require('next');
const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const sitemapHelper = require('./utils/sitemapHelper');
const apiEndpoints = require('./routes/api/index');

const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const { setConfig } = require('next/config');
setConfig(require('./next.config'));

/** Passport **/
const passport = require('passport');
require('./utils/Auth/passport/passport.js');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Load environment variables from .env file if present
require('dotenv').load();

process.on('uncaughtException', function(err) {
	console.error('Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
	console.error('Unhandled Rejection: Promise:', p, 'Reason:', reason);
});

// Default when run with `npm start` is 'production' and default port is '80'
// `npm run dev` defaults mode to 'development' & port to '3000'
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || 5008;

// Initialize Next.js
const nextApp = next({
	dir: '.',
	dev: process.env.NODE_ENV === 'development'
});

const expressApp = express();
const httpServer = require('http').Server(expressApp);





nextApp
	.prepare()
	.then(() => {
		// Serve fonts from ionicon npm module
		expressApp.use('/fonts/ionicons', express.static('./node_modules/ionicons/dist/fonts'));

		expressApp.get('/robots.txt',  (req, res) => {
			res.status(200).sendFile('robots.txt', {
				root: __dirname + '/static/',
				headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
			});
		});

		expressApp.get('/sitemap.xml',  (req, res) =>{
			res.header('Content-Type', 'application/xml');
			sitemapHelper.createSitemap(res);
		});

		// Catching files default options, no immediate parsing
		expressApp.use(fileUpload({
			parseNested:true
		}));
		expressApp.use(cookieParser());
		expressApp.use(bodyParser.json({limit: '100mb', extended: true} ));
		expressApp.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:50000 }));

		expressApp.use(
			session({
				secret: 'mysupersecret',
				resave: false,
				saveUninitialized: false,
				// store: new MongoStore({ mongooseConnection: mongoose.connection }),
				cookie: { maxAge: 180 * 60 * 1000 }
			})
		);

		// passport
		expressApp.use(passport.initialize());
		expressApp.use(passport.session());

		expressApp.use((req, res, next) => {
			res.locals.login = req.isAuthenticated();
			res.locals.session = req.session;
			res.locals.user = req.user || null;
			next();
		});

		// expressApp.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
		expressApp.use('/api', apiEndpoints);

        // Set/Collection page
        expressApp.get('/sets/:id?/:collectionId?', (req, res) => {
            // Note: To make capturing a slug easier when rendering both client
            // and server side, name it ':id'
            return nextApp.render(req, res, '/sets', req.params);
        });

		// Pages page
		expressApp.get('/pages/:id?', (req, res) => {
			// Note: To make capturing a slug easier when rendering both client
			// and server side, name it ':id'
			return nextApp.render(req, res, '/pages', req.params);
		});



		// Default catch-all handler to allow Next.js to handle all other routes
		expressApp.all('*', (req, res) => {
			let nextRequestHandler = nextApp.getRequestHandler();
			return nextRequestHandler(req, res);
		});

		httpServer.listen(process.env.PORT,  err => {
			if (err) {
				throw err;
			}
			console.log('> Ready on http://localhost:' + process.env.PORT + ' [' + process.env.NODE_ENV + ']');
		});
	})
	.catch(err => {
		console.log('An error occurred, unable to start the server');
		console.log(err);
	});
