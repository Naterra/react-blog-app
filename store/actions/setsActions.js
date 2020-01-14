import axios from 'axios';
import * as types from "../types";



export const getSets = (param)=> dispatch =>{
    const {limit, sort, page } = param;

    let query=[];
    if(limit) query.push(`limit=${limit}`);
    if(sort) query.push(`sort=${sort}`);
    if(page) query.push(`page=${page}`);

    return axios.get(`/api/set/sets-list?`+query.join('&'))
        .then(res => res.data)
        .catch(err=> Promise.reject(err.response));
};



export const getSet = (id, loadToStore=false)=> dispatch =>{
    if(!id) throw new Error('getSet fn: missed required field =>ID ');


    return axios.get(`/api/set/`+id)
        .then(res => {
            if(loadToStore)   {
                dispatch({ type: types.LOAD_RECORD, payload: res.data  });
            }
            return res.data;
        })
        .catch(err=> Promise.reject(err.response));
};


// Create/Update Set
export const saveSet = (param)=> dispatch =>{
    console.warn('saveSet', param);
    const {_id, setId, title, description, image, upload_file, year, pieces,figures, set_desr, box_dimention, weight, upc, yVideo, deleteFiles } = param;


    const data = new FormData();
    data.append('title', title || '');
    data.append('setId', setId || '');
    data.append('image', image || '');
    data.append('description', description || '');
    data.append('year', year || '');
    data.append('pieces', pieces || '');
    data.append('figures', figures || '');
    data.append('set_desr', set_desr || '');
    data.append('box_dimention', JSON.stringify(box_dimention) || '');
    data.append('weight', weight || '');
    data.append('upc', upc || '');
    data.append('yVideo', yVideo || '');


    if(_id) data.append('_id', _id);
    if(deleteFiles) data.append('deleteFiles', JSON.stringify(deleteFiles));


    if(upload_file){
        if(upload_file['image']) data.append('new_image', upload_file['image'][0]);
    }


    const conf = {
       headers: { 'Content-Type': 'multipart/form-data' }
    };

    return axios.post(`/api/set`, data, conf)
        .then(res => res.data)
        .catch(err=> Promise.reject(err.response));
};




export const deleteSet = (_id)=> dispatch =>{
    return axios.delete(`/api/set/${_id}`)
        .then(res => res.data)
        .catch(err=> Promise.reject(err.response));
};


