// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import axios from 'axios';

// Types
import { SUBMIT_FIVE_DAY_FORECAST, LOCATION_REQUEST } from './types';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
// Created a seperate call to the bulk data together
export const fiveDayDataForecast = (query, lat, lon) => {
    let URL = '';
    const OWM_API_KEY = process.env.REACT_APP_WEATHER_API_URL;
    // Change URL structure depending on what is recieved through this action creator
    if(query) {
        URL = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&weather?q=${query}&units=imperial&appid=${OWM_API_KEY}`;
    } else if(!query) {
        URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OWM_API_KEY}`;
    }
    
    return dispatch => axios.get(URL)
        .then(result => {
            dispatch({
                type: SUBMIT_FIVE_DAY_FORECAST,
                payload: result
            })
        })
};

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
// Used for returning a users location using the HTML5 Geolocation APi
export const getLocation = () => {
    const nav = navigator.geolocation;

    return dispatch => nav.getCurrentPosition((position) => {
        const lat = `${position.coords.latitude}`;
        const lon = `${position.coords.longitude}`;
        dispatch({ type: LOCATION_REQUEST })
        dispatch(fiveDayDataForecast(null, lat, lon))
    })
}

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //