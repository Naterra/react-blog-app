const express = require('express');
const router = express.Router();

// Models
const Settings = require('../../db/models/Settings');

router.get('/', async (req, res) => {
	const { name } = req.query;

	Settings.findOne({ name: name }, (err, data) => {
		if (err) {
			return res.status(500).send(err);
		} else {
			return res.status(200).send(data);
		}
	});
});

router.post('/', async (req, res, next) => {
	const { name, param } = req.body;
	if (!name) return res.send(500, { error: 'Settings name is required' });
	let newData = { name, param };

	Settings.findOneAndUpdate({ name: name }, newData, { new: true, upsert: true }, (err, doc) => {
		if (err) {
			return res.status(500).send({ error: err });
		} else {
			return res.status(200).send(doc);
		}
	});
});

module.exports = router;
