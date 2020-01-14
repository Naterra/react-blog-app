import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import invariant from 'redux-immutable-state-invariant';
import { reducer as formReducer } from "redux-form";

/**   Reducers  **/
// import searchReducer from './searchReducer';
import userReducer from './userReducer';
import setPageReducer from './setPageReducer';


export const rootReducer = combineReducers({
    form: formReducer,
    setPage: setPageReducer,
    // search: searchReducer,
    user: userReducer
});

let initialState={};

const composeEnhancers = composeWithDevTools({ shouldHotReload: false });


export const initializeStore=()=>{
    console.error('initializeStore');
    return createStore(rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
        // composeEnhancers(
        //     applyMiddleware(invariant(), thunkMiddleware)
        // )
    );
};

export default createStore(rootReducer,
        initialState,
        composeWithDevTools(
        applyMiddleware(thunkMiddleware))
    );

export const makeStore = (initialState, options) => {
    return createStore(rootReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunkMiddleware))
    );
};