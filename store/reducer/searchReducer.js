// import * as types from "../actions/types";
import { CHANGE_SEARCH_LOCATION, CHANGE_SEARCH_KEYWORD } from "../types";

export default function(state =null, action){
    // console.warn('action', action);

    switch(action.type){
        case CHANGE_SEARCH_KEYWORD:
            return {...state, keyword: action.payload};
        case CHANGE_SEARCH_LOCATION:
            return {...state, location: action.payload};
        default:
            return state;
    }
}