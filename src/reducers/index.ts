import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import pObjectReducer from './pObjectReducer';
import { IStoreState } from '../types';

/*
* One root reducer for the whole app.
* This is done so that the app will have one single reducer to manage lots of other resources.
* And also communication between the reducers will be easier to maintain.
*/
const rootReducer = combineReducers<IStoreState>({
  petriObject: pObjectReducer,
});

export default rootReducer;