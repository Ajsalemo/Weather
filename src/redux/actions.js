// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import axios from 'axios';

// Types
import { SUBMIT_REQUEST, SUBMIT_FIVE_DAY_FORECAST } from './types';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

export const submitSearchLocation = query => {
    const OWM_API_KEY = process.env.REACT_APP_WEATHER_API_URL;
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=5&weather?q=${query}&units=imperial&appid=${OWM_API_KEY}`;

    return dispatch => axios.get(URL)
        .then(result => {
            dispatch({
                type: SUBMIT_REQUEST,
                payload: result
            })
        })
            .catch(err => {
                console.log(err);
            })

};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
// Created a seperate call to the bulk data together
export const fiveDayData = query => {
    const OWM_API_KEY = process.env.REACT_APP_WEATHER_API_URL;
    const URL = `http://api.openweathermap.org/data/2.5/forecast?q=${query}&weather?q=${query}&units=imperial&appid=${OWM_API_KEY}`;

    return dispatch => axios.get(URL)
        .then(result => {
            dispatch({
                type: SUBMIT_FIVE_DAY_FORECAST,
                payload: result
            })
            // TEST - Trying to gain the weather values at 12pm each day for a 5 day forecast
            Object.values(result).map((res, i) => {
                const list = res.list;
                for(let j = 0; j < list.length; j++) {
                    list[j].dt_txt.includes("12:00:00") ? 
                    console.log(list[j]) : console.log('false')
                }
            })
        })
            .catch(err => {
                console.log(err);
            })

};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //