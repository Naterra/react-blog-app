const express = require('express');
const router = express.Router();


// Models
const Page = require('../../db/models/Page');

// Helpers
const fileHelper = require('../../utils/fileHelper');

router.get('/list', async (req, res) => {
	let { sort, limit, page } = req.query;

	//Convert
	limit = limit ? Number(limit) : 0;
	page = page ? Number(page) : 0;

	// Find {}
	let findData = req.query;
	delete findData.limit;
	delete findData.page;
	delete findData.sort;

	console.log('>> Find Data', findData);
	console.log('>> param', {
		page,
		limit,
		skip: limit * page
	});

	let sortParam = { createdDate: 'desc' };

	Page.find(findData)
		.limit(limit)
		.skip(limit * page)
		.sort(sortParam)
		.exec(async (err, data) => {
			if (err) {
				console.log(err, 'err');
				return res.send(err);
			} else {
				const total = await Page.countDocuments(findData);

				return res.send({
					items: data,
					total
				});
			}
		});
});

// Single Page
router.get('/:id', async (req, res) => {
	let { id } = req.params;
	console.log('>>> GET Page', req.params);

	Page.findOne({ _id: id }).exec(async (err, data) => {
		if (err) {
			console.log('err', err);
			return res.status(500).json(err);
		} else {
			return res.send(data);
		}
	});
});

// Single Page By Incremented Id
router.get('/getPageById/:id', async (req, res) => {
	let { id } = req.params;
	console.log('>>> GET Page', req.params);

	Page.findOne({ id }).exec(async (err, data) => {
		if (err) {
			console.log('err', err);
			return res.status(500).json(err);
		} else {
			return res.status(200).send(data);
		}
	});
});




// Create/Update Record
router.post('/', async (req, res, next) => {
	// console.log(">>> POST /Page", req.body );
	let { _id, title, description, showOnMenu, showOnFront, deleteFiles } = req.body;
	console.log('>>> POST /Page', { _id, title, deleteFiles });

	// Required fields
	if (!title) return res.send(500, { error: 'title is required' });

	let newData = {
		title,
		description,
		showOnMenu: showOnMenu != null ? showOnMenu : false,
		showOnFront: showOnFront != null ? showOnFront : false
	};

	// Create new record or use existing
	let record = _id ? await Page.findOne({ _id }) : await new Page(newData).save();

	// Delete Files on Server
	if (deleteFiles) {
		deleteFiles = JSON.parse(deleteFiles);
		for (let filePath of deleteFiles) {
			fileHelper.deleteFile('/public' + filePath);
		}
	}

	// Upload New Files
	if (req.files) {
		if (req.files['new_image']) {
			// Upload Image In /uploads/Sets/id/

			let result = await fileHelper.download({
				file: req.files['new_image'],
				folder: `/public/uploads/pages/${record._id}`
			});
			console.log('downloadFile result', result);
			if (result.uploaded == true) {
				newData.image = result.filePath;
			}
		}
	}

	// Update
	record.updateOne(newData, (err, doc) => {
		if (err) {
			console.log('POST /set err', err);
			return res.status(500).send({ error: err });
		} else {
			return res.status(200).send({ status: 'Success' });
		}
	});
});



// Delete record
router.delete('/:id', async (req, res, next) => {
	let { id } = req.params;
	if (!id) return res.status(500).send({ error: 'id is required' });

	// Remove Page folder
	let pageFolder = `/public/uploads/pages/${id}`;
	fileHelper.deleteFolderRecursivelly(pageFolder);

	Page.findOneAndRemove({ _id: id }, (err, rec) => {
		if (err) return res.status(500).send({ error: err });
		return res.status(200).send({
			status: 'Success'
		});
	});
});

module.exports = router;
