import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {routes} from './routers';

let App = () => {
    return (
        <Router>
            <React.Fragment>
                {routes.map((item, index) => {
                    return (
                        <Route exact key={index} path={item.path} component={item.component}/>
                    );
                })}
            </React.Fragment>
        </Router>
    );
};

export default App;
