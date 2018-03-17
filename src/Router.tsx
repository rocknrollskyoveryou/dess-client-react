import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import configureStore from './store/configureStore';
import { PRELOADED_STATE } from './constants';

// Petri-object designer container component
import pObjectDesigner from './containers/pObjectDesigner';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Create store
const store = configureStore(PRELOADED_STATE, middleware);

// The Routing Component providing all the routing configuration
const Router = () => (
    <Provider store={store} >
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={pObjectDesigner} />
            </Switch>
        </ConnectedRouter>    
    </Provider>
);

export default Router;