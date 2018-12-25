// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import axios from 'axios';

// Types
import { SUBMIT_REQUEST } from './types';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export const submitSearchLocation = query => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_URL;
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=5&weather?q=${query}&units=imperial&appid=${API_KEY}`;

    return dispatch => axios.get(URL)
        .then(result => {
            dispatch({
                type: SUBMIT_REQUEST,
                payload: result
            })
            console.log(result.data.weather[0].description);
        })
            .catch(err => {
                console.log(err);
            })

};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //