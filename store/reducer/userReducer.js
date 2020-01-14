// import * as types from "../actions/types";
import {   FETCH_USER  } from "../types";

export default function(state =null, action){
    // console.warn('action', action);

    switch(action.type){
        // case SAVE_USER:
            // return action.payload;
        case FETCH_USER:
            return action.payload;
        default:
            return state;
    }
}