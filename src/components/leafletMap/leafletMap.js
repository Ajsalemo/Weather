// -------------------------------------------- Imports -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

import React from 'react';

// Leaflet 
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

let LeafletMap = props => {
    const { position, zoom, city, country, lat, lon, main, temp, celsius, loading, loadingProp } = props;
    const API_KEY = process.env.REACT_APP_WEATHER_API_URL;

    return (
        <Map center={position} zoom={zoom} style={{height: '300px'}}>
            {loading 
                ? (
                    <div>
                        {/* -------------------------------------- Base layer ------------------------------------------------ */}
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url={`https://{s}.tile.osm.org/{z}/{x}/{y}.png`}
                        />
                        {/* --------------------------------------- Cloud layer --------------------------------------- */}
                        <TileLayer
                            url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
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
                            <b>{main}</b> | {temp}&deg; / {celsius}&deg;C
                        </Popup>
                        </Marker>
                    </div>
                )  : loadingProp}
        </Map>
    )
}

// ------------------------------------------------------------------------------------------------------- //

export default LeafletMap;

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
