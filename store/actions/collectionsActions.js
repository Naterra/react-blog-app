import axios from 'axios';
// import * as types from "../types";


export const getCollections = (param)=> dispatch =>{
    const { _id, setId, title, page, limit, sort, populateSetData } = param;

    let query=[];
    if(_id) query.push(`_id=${_id}`);
    if(setId) query.push(`setId=${setId}`);
    if(sort) query.push(`sort=${sort}`);
    if(page) query.push(`page=${page}`);
    if(limit) query.push(`limit=${limit}`);
    if(populateSetData) query.push(`populateSetData=true`);
    if(title) query.push(`title=${title}`);


    return axios.get(`/api/collection/list?`+query.join('&'))
        .then(res => res.data)
        .catch(err=>Promise.reject(err.response));
};



// Create/Update Collection
export const saveCollection = (param)=> dispatch =>{
    // console.warn('saveCollection', param);

    const data = new FormData();
    if(param.description) data.append('description', param.description);
    if(param.setId) data.append('setId', param.setId);
    if(param.title) data.append('title', param.title);
    if(param.images) data.append('images', JSON.stringify(param.images));
    if(param._id) data.append('_id', param._id);
    if(param.upload_pdf) data.append('upload_pdf', param.upload_pdf[0]);
    if(param.deleteFiles) data.append('deleteFiles', JSON.stringify(param.deleteFiles));

    let images_titles=[];
    if(param.upload_images) {
        for(let img of param.upload_images){
            data.append('upload_images', img);
            images_titles.push(img.imgTitle);
        }
        data.append('upload_images_titles', JSON.stringify(images_titles));
    }


    const conf = {
        headers: { 'Content-Type': 'multipart/form-data' }
    };

    return axios.post(`/api/collection`, data, conf)
        .then(res => res.data)
        .catch(err => Promise.reject(err.response));
};




export const deleteCollection = (_id)=> dispatch =>{
    return axios.delete(`/api/collection/${_id}`)
        .then(res => res.data)
        .catch(err=>Promise.reject(err.response));
};




