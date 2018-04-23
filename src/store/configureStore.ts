import { createStore, applyMiddleware, Middleware } from 'redux';

import { UPDATE_PLACE, UPDATE_TRANSITION } from '../constants';

import { IStoreState } from '../types';

// Redux logging middleware
import { createLogger } from 'redux-logger';

// Import the root reducer
import rootReducer from '../reducers';

// Create the redux logging middleware
const loggerMiddleware = createLogger({
  predicate: (getState, action) => (action.type !== UPDATE_PLACE && action.type !== UPDATE_TRANSITION),
});

// Configuring the Store. PreloadState is the initial State.
export default function configureStore(preloadedState?: IStoreState, ...middlewares: Array<Middleware>) {
  return createStore(
    rootReducer,
    preloadedState,

    // Apply the middleware usign the Redux's provided applymiddleware function
    applyMiddleware(loggerMiddleware, ...middlewares),
  );
}
