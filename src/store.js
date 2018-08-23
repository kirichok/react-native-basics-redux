import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

let _reducers;

export function defineReducers(reducers) {
    _reducers = combineReducers(reducers);
}

export default () => {
    return createStore(_reducers, applyMiddleware(thunk, promiseMiddleware()));
}
