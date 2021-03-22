/* eslint-disable import/first */
// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
// Dotenv for .env variables
require('dotenv').config()
import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Redux
import { store, persistor } from './redux/store';

// Container
import RouteContainer from './route-container';

// Base styles
import CssBaseline from '@material-ui/core/CssBaseline';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

const App = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.Fragment>
            <CssBaseline />
            <RouteContainer />
          </React.Fragment>
        </PersistGate>
      </Provider>
    )
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export default App;

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //