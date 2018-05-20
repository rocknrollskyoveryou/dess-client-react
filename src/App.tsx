import * as React from 'react';

/* 
 * CssBaseline is used for HTML style normalization
 * Details: https://material-ui-next.com/style/css-baseline/
 */
import CssBaseline from '@material-ui/core/CssBaseline';

import Router from './Router';

const App = () => (
    <div>
        <CssBaseline />
        <Router />
    </div>
);

export default App;
