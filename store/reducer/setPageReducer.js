// import * as types from "../actions/types";
import {   LOAD_RECORD  } from "../types";

export default function(state =null, action){
    // console.warn('action', action);

    switch(action.type){
        case LOAD_RECORD:
            return action.payload;
        default:
            return state;
    }
}