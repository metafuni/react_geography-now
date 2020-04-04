import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import Axios from 'axios';

import Logo from '../img/logo.png'

const GeoMap = ({ country }) => {

    const API_KEY = 'pk.eyJ1IjoibWV0YWZ1bmlzdGVmYW5vIiwiYSI6ImNrOGl2ZDZjdTAzYXczZW55aTl6aHl5MHYifQ.e4hq7DmvQFFATjKR24028A';

    const [lat, setLat] = useState(15);
    const [lng, setLng] = useState(15);
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(false);

    const [viewport, setViewport] = useState({
        width: 1400,
        height: 700,
        latitude: lat,
        longitude: lng,
        zoom: 2
    });

    //get coordinates of capital city
    // const getCoord = async () => {
    //     if (country.capital) {
    //         const result = await Axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country.capital}.json?access_token=${API_KEY}`);
    //         setLat(result.data.features[0].center[1]);
    //         setLng(result.data.features[0].center[0]);
    //     } else {
    //         setLat(country.latlng[0]);
    //         setLng(country.latlng[1]);
    //     };
    // };

    //set all the markers with coordinates on the map for the capital cities/countries
    const getAllCapitals = async () => {
        const result = await Axios(`https://restcountries.eu/rest/v2/all`);
        result.data.forEach(async el => {
            if (el.capital) {
                const result = await Axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${el.capital}.json?access_token=${API_KEY}`);
                if (result.data.features[0] && result.data.features[0].center[1] && result.data.features[0].center[0]) {
                    setMarkers(markers => [...markers, {
                        name: el.name,
                        capital: el.capital,
                        latitude: result.data.features[0].center[1],
                        longitude: result.data.features[0].center[0]
                    }]);
                } else {
                    setMarkers(markers => [...markers, {
                        name: el.name,
                        capital: el.capital,
                        latitude: 0,
                        longitude: 0
                    }]);
                };

            } else {
                if (el.latlng[0] && el.latlng[1]) {
                    setMarkers(markers => [...markers, {
                        name: el.name,
                        capital: undefined,
                        latitude: el.latlng[0],
                        longitude: el.latlng[1]
                    }]);
                } else {
                    setMarkers(markers => [...markers, {
                        name: el.name,
                        capital: undefined,
                        latitude: 0,
                        longitude: 0
                    }]);
                };
            };
        });
    };

    const fetchCapitalInfo = async () => {

    };

    useEffect(() => {
        getAllCapitals();
    }, []);

    // useEffect(() => {
    //     getCoord();
    // });

    useEffect(() => {
        setViewport({ ...viewport, latitude: lat, longitude: lng });
    }, [lat, lng]);

    return (
        <div className="geomap-container">
            <div className="header">
                <h1>
                    <span className="elearn">
                        <span className="e">
                            e <i className="fas fa-graduation-cap"></i>
                        </span>
                        learn
                    </span>
                    GeoMap
                </h1>
            </div>
            <ReactMapGl
                className="geomap"
                {...viewport}
                onViewportChange={(viewport) => { setViewport(viewport) }}
                mapboxApiAccessToken={API_KEY}
                mapStyle='mapbox://styles/metafunistefano/ck8iw9s0y08xf1iqvywbh9jnt'
            >
                {/* map over all capital cities in the world to alternatively display all markers */}

                {markers && markers.map(el => (
                <Marker key={el.name} latitude={el.latitude} longitude={el.longitude}>
                    <button style={{background: 'none', border: 'none', outline: 'none'}}>
                        <img src={Logo} alt={`${el.capital} ${el.name}`} width="30px" style={{background: 'white', borderRadius: '50%'}}></img>
                    </button>
                </Marker>
            ))}
                {/* {lat && lng && <Marker key={country.name} latitude={lat} longitude={lng}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setSelected(!selected);
                        fetchCapitalInfo();
                    }}>
                        <img src={Logo} alt={`${country.capital} ${country.name}`} style={{borderRadius: '50%'}} width="50px"></img>
                    </button>
                </Marker>}
                {selected && (
                    <Popup 
                        latitude={lat} 
                        longitude={lng}
                        onClose={() => setSelected(false)}
                    >
                        <div className="capital-info">
                            
                        </div>
                    </Popup>)} */}
            </ReactMapGl>
        </div>
    )
}

export default GeoMap;
