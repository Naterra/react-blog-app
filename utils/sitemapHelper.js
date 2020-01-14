/*
1. https://support.google.com/webmasters/answer/183668?hl=en
2. https://www.sitemaps.org/protocol.html#prioritydef
- All formats limit a single sitemap to 50MB (uncompressed) and 50,000 URLs.
*/

const sm = require('sitemap');
const axios = require('axios');
const conf = require('../config');

const determinePriority = url => {
	if (url.includes('pages/')) {
		return 0.6;
	} else {
		return 1.0;
	}
};

const createSitemap = async res => {
	let sitemap = sm.createSitemap({
		hostname: conf.SERVER_URL,
		cacheTime: 60
	});

	// Main Page
	sitemap.add({ url: '/', changefreq: 'daily', priority: determinePriority('/') });

	console.log('req url', conf.SERVER_URL+'/api/pages/list');

	// Pages
	let req = await axios.get(conf.SERVER_URL+'/api/pages/list');
	const records = req.data.items;
	// console.log('req', records);


	records.map((item) => {
		let url = 'pages/'+item._id;
		sitemap.add({
			url: url,
			changefreq: 'weekly',
			priority: determinePriority(url)
		})
	});

	// Sets
	let reqSets = await axios.get(conf.SERVER_URL+'/api/set/sets-list');
	const setsRecords = reqSets.data.items;

	setsRecords.map((item) => {
		let url = 'sets/'+item._id;
		sitemap.add({
			url: url,
			changefreq: 'weekly',
			priority: determinePriority(url)
		})
	});

	// Collections
	let colSets = await axios.get(conf.SERVER_URL+'/api/collection/list?populateSetData=true');
	const cRecords = colSets.data.items;

	cRecords.map((item) => {
		let url = `sets/${item.setData._id}/${item._id}`;
		sitemap.add({
			url: url,
			changefreq: 'weekly',
			priority: determinePriority(url)
		})
	});

	res.send(sitemap.toString());
};

module.exports = {
	createSitemap: createSitemap
};
