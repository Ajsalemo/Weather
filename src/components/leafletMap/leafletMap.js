// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';

// Leaflet 
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

let LeafletMap = props => {
    const { position, zoom, city, country, lat, lon, main, temp } = props;
    const API_KEY = process.env.REACT_APP_WEATHER_API_URL;

    return (
        <Map center={position} zoom={zoom} style={{height: '400px'}}>
            {/* -------------------------------------- Base layer ------------------------------------------------ */}
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url={`https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png`}
            />
            {/* --------------------------------------- Precipitation layer --------------------------------------- */}
            <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />
            <Marker position={position}>
            <Popup>
                {city}, {country} 
                <br /> 
                {lat}, {lon}
                <br />
                <b>{main}</b> | {temp}&deg;
            </Popup>
            </Marker>
        </Map>
    )
}

// ------------------------------------------------------------------------------------------------------- //

export default LeafletMap;

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
