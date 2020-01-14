import axios from 'axios';
import * as types from "../types";



export const changeSearchLocation = (location)=> dispatch =>{
    // console.warn('>>> changeSearchLocation FN', location);
    dispatch({ type: types.CHANGE_SEARCH_LOCATION, payload: location   });
};

export const changeSearchKeyword = (keyword)=> dispatch =>{
    // console.warn('>>> changeSearchKeyword FN', keyword);
    dispatch({ type: types.CHANGE_SEARCH_KEYWORD, payload: keyword   });
};


