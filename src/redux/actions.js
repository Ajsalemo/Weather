// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import axios from 'axios';

// Types
import { SUBMIT_FIVE_DAY_FORECAST_SUCCESS } from './types';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
// Created a seperate call to the bulk data together
export const fiveDayDataForecast = query => {
    const OWM_API_KEY = process.env.REACT_APP_WEATHER_API_URL;
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&weather?q=${query}&units=imperial&appid=${OWM_API_KEY}`;

    return dispatch => axios.get(URL)
        .then(result => {
            dispatch({
                type: SUBMIT_FIVE_DAY_FORECAST_SUCCESS,
                payload: result
            })
        })
            .catch(err => {
                return err;
            })
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //