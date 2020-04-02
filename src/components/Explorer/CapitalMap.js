import React, { useState, useEffect } from 'react';
import ReactMapGl from 'react-map-gl';

const CapitalMap = ({ country }) => {

    const API_KEY = 'pk.eyJ1IjoibWV0YWZ1bmlzdGVmYW5vIiwiYSI6ImNrOGl2ZDZjdTAzYXczZW55aTl6aHl5MHYifQ.e4hq7DmvQFFATjKR24028A';

    const [lat, setLat] = useState(country.latlng[0]);
    const [lng, setLng] = useState(country.latlng[1]);

    const [viewport, setViewport] = useState({
        width: 1050,
        height: 650,
        latitude: lat,
        longitude: lng,
        zoom: 4
    });

    useEffect(() => {
        setLat(country.latlng[0]);
        setLng(country.latlng[1]);
    }, [country]);

    return (
        <div className="capitalmap">
            <ReactMapGl
                className="mapview"
                {...viewport}
                onViewportChange={setViewport}
                mapboxApiAccessToken={API_KEY}
                mapStyle = 'mapbox://styles/metafunistefano/ck8iw9s0y08xf1iqvywbh9jnt'
            />
        </div>
    )
}

export default CapitalMap;
