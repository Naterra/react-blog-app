import axios from 'axios';
import * as types from "../types";




/** Actions **/
import { getNews, getTeachers } from '.';
import { } from "../types";

/****/




export const updateUserProfile = (userRecord, newFile) =>  async (dispatch)=>{
    console.error('*** updateUserProfile FN', userRecord);

    if(newFile){
        const avatarReq = await dispatch(uploadUserImage({userId:userRecord._id, newFile }));
        console.warn('avatar', avatarReq);
        const fileUrl = avatarReq.data.url;
        userRecord.image =fileUrl;
    }



    return axios
        .put(`/api/user/${userRecord._id}`, userRecord)
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });
};

export const uploadUserImage = ({userId, file}) =>  (dispatch)=>{
    console.error('*** uploadUserImage FN', {userId, file});

    const data = new FormData();
    data.append('file', file);
    data.append('userId', userId);

    return axios
        .post(`/api/user/userAvatar`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            return res;
        })
        .catch(err => {
            return err;
        });

};

export const getUserData = (_id) =>  (dispatch)=>{
    // console.log('getUserData FN', _id);

    return axios.get(`/api/user/${_id}`)
        .then(async (res) => {

            // Store.User
            dispatch({ type: types.FETCH_USER, payload: res.data  });

            return res.data;
        })
        .catch(err=>{
            // console.log('getUserData FN: catch', err);
            return err;
        });
};


export const getSessionUser = () => (dispatch, getState)  => {
    // console.log(">>> getSessionUser FN");
    return axios.get('/api/auth/authorized-user', { headers: { Authorization: `bearer ${Auth.getToken()}` }})
        .then(res => {
            console.log('getSession.user res', res);
            // dispatch({ type: types.FETCH_USER, payload: res.data.user  });
            return res.data;
        })
        .catch(err=>{
            console.log('getSession.User catch', err);
            return false;
        });
};

export const updateUserOrganization = (userId, organization)=> dispatch =>{
    // return axios
    //     .put(`/api/user/organization`, {
    //         userId: userId,
    //         organization
    //     })
    //     .then(res => {
    //         console.log('>>> updateUserOrganization THEN  res', res);
    //         dispatch({ type: types.FETCH_USER, payload: res.data  });
    //         return res;
    //     })
    //     .catch(err => {
    //         console.error('>>> updateUserOrganization CATCH  catch', err.response);
    //         return err;
    //     });
};

export const verifyEmailWithToken = (token) => (dispatch)=>{
    // console.log('getUserData FN', token);
    if(!token) return Promise.reject({error:"Ошибка параметров"});

    return axios.post(`/api/user/verifyEmailWithToken`,{ token })
        .then(res => {
            return res;
        })
        .catch(err=>{
            return err;
        });
};



/************* Auth ****************/
export const signUp = ({name, email,password }) => (dispatch)=>{
    return axios
        .post(`/api/auth/sign-up`, { name, email, password })
        .then(res => {
            return res;
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

export const sighOut = () => (dispatch)=>{
    return axios
        .get(`/api/auth/sign-out` )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            // const messages = err.response.data;
            return err;
        });
};

export const signIn = ({ email, password  }) => (dispatch)=>{
    return axios
        .post(`/api/auth/sign-in`, { email, password })
        .then(res => {
            console.warn('>>>signIn THEN --', res);
            return res;
        })
        .catch(err => {
            // console.error('>>> signIn CATCH --', err.response);
            // const messages = err.response.data;
            return   Promise.reject(err);
        });
};


export const verifyEmailAfterRegistration = (email) => (dispatch)=>{
    console.log('verifyEmailAfterRegistration FN', email);
    if(!email) return Promise.reject({error:"Ошибка параметров"});

    return axios.post(`/api/auth/verifyEmailAfterRegistration`,{ email })
        .then(res => {
            console.log('verifyEmailAfterRegistration FN then', res);

            return res;
        })
        .catch(err=>{
            return err;
        });
};


//
//
//
// export const saveUserPassport = (data)=> dispatch =>{
//     dispatch({ type: types.SAVE_USAVE_USERSER, payload: data  });
// };