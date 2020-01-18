import axios from 'axios';
import * as types from '../types';

export const getPages = (param = {}) => dispatch => {
	const { limit, sort, page } = param;

	let query = [];
	if (limit) query.push(`limit=${limit}`);
	if (sort) query.push(`sort=${sort}`);
	if (page) query.push(`page=${page}`);

	return axios
		.get(`/api/pages/list?` + query.join('&'))
		.then(res => res.data)
		.catch(err => Promise.reject(err.response));
};

export const getPage = (id, loadToStore = false) => dispatch => {
	if (!id) throw new Error('getPage fn: missed required field =>ID ');

	return axios
		.get(`/api/pages/` + id)
		.then(res => {
			if (loadToStore) {
				dispatch({ type: types.LOAD_RECORD, payload: res.data });
			}
			return res.data;
		})
		.catch(err => Promise.reject(err.response));
};

export const getPageById = (id) => dispatch => {
	if (!id) throw new Error('getPageById fn: missed required field =>ID ');

	return axios
		.get(`/api/pages/getPageById/` + id)
		.then(res => res.data)
		.catch(err => Promise.reject(err.response));
};



// Create/Update Page
export const savePage = param => dispatch => {
	console.warn('savePage', param);
	const { upload_file, deleteFiles } = param;

	const data = new FormData();
	if (param.deleteFiles) delete param.deleteFiles;
	for (let k of Object.keys(param)) {
		data.append(`${k}`, param[k]);
	}

	if (deleteFiles) data.append('deleteFiles', JSON.stringify(deleteFiles));
	if (upload_file) {
		if (upload_file['image']) data.append('new_image', upload_file['image'][0]);
	}

	const conf = {
		headers: { 'Content-Type': 'multipart/form-data' }
	};

	return axios
		.post(`/api/pages`, data, conf)
		.then(res => res.data)
		.catch(err => Promise.reject(err.response));
};

export const deletePage = _id => dispatch => {
	return axios
		.delete(`/api/pages/${_id}`)
		.then(res => res.data)
		.catch(err => Promise.reject(err.response));
};
