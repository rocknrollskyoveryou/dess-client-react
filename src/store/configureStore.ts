import { createStore, applyMiddleware, Middleware } from 'redux';

import { IStoreState } from '../types';

// Redux logging middleware
import { createLogger } from 'redux-logger';

// Import the root reducer
import rootReducer from '../reducers';

// Create the redux logging middleware
const loggerMiddleware = createLogger();

// Configuring the Store. PreloadState is the initial State.
export default function configureStore(preloadedState?: IStoreState, ...middlewares: Array<Middleware>) {
  return createStore(
    rootReducer,
    preloadedState,

    // Apply the middleware usign the Redux's provided applymiddleware function
    applyMiddleware(loggerMiddleware, ...middlewares),
  );
}
