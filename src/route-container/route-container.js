// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Pages
import Home from '../pages/home';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const RouteContainer = () => {
    return (
        <Router>
            <Switch>
                <Route component={Home} path='/' />
            </Switch>
        </Router>
    )
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default RouteContainer;

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //