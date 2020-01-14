import axios from 'axios';

export const getSettings = name => dispatch => {
	console.log('>>> getSettings', name);

	return axios
		.get(`/api/settings?name=${name}`)
		.then(res => res.data)
		.catch(err => Promise.reject(err));
};

export const addSettings = (name, param) => dispatch => {
	return axios
		.post(`/api/settings`, {
			name,
			param
		})
		.then(res => res.data)
		.catch(err => Promise.reject(err));
};

export const editSettings = (name, param, _csrf) => dispatch => {
	return axios
		.put(`/api/settings`, { name, param })
		.then(res => res.data)
		.catch(err => Promise.reject(err));
};
