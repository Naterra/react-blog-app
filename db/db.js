const mongoose = require('mongoose');
const config = require('../config');

const setUpConnection = () => {
	mongoose.connect(config.mongo_URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	});
};

module.exports = {
	setUpConnection: setUpConnection
};
