import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import Axios from 'axios';

import Logo from '../img/logo.webp'

const GeoMap = ({ country }) => {

    const YT_API_KEY = 'AIzaSyBimMgTEpBaf0Dmt1FjuF8Vdw_rQGBMXO8';
    const channelID = 'UCmmPgObSUPw1HL2lq6H4ffA';
    const playlistID = 'PLR7XO54Pktt8_jNjAVaunw1EqqcEAdcow';

    const [lat, setLat] = useState(15);
    const [lng, setLng] = useState(15);
    const [markers, setMarkers] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState();
    const [videoURL, setVideoURL] = useState(null);
    const [loading, setLoading] = useState(true);

    const [viewport, setViewport] = useState({
        // width: 1400,
        width: "100%",
        // height: 700,
        height: "100%",
        latitude: lat,
        longitude: lng,
        zoom: 2
    });

    //set all the markers with coordinates on the map for the capital cities/countries
    const getAllCapitals = async () => {
        const result = await Axios(`https://restcountries.eu/rest/v2/all`);
        result.data.forEach(async el => {
            if (el.capital) {
                const result = await Axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${el.capital}.json?&country=${el.alpha2Code}&access_token=${process.env.REACT_APP_MAPBOX_KEY}`);

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
                        latitude: el.latlng[0],
                        longitude: el.latlng[1]
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
        setLoading(false);
    };

    const fetchYoutube = async () => {
        if (selectedCountry) {
            const ytURL = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${channelID}&part=snippet,id&order=relevance&maxResults=10&q=Geography+Now!+${selectedCountry.name}`;

            const result = await Axios(ytURL);

            if (result.data.items[0]) {
                setVideoURL(`https://www.youtube.com/embed/${result.data.items[0].id.videoId}`);
            } else {
                setVideoURL(null);
            };

            // for (let i = 0; i < result.data.items.length; i++) {
            //     if (result.data.items[i].snippet.title === `Geography Now! ${selectedCountry.name}`) {
            //         setVideoURL(`https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`);
            //     } else {
            //         setVideoURL(null);
            //     };
            // };
        };
    };

    useEffect(() => {
        getAllCapitals();
        // setLoading(false);
    }, []);

    useEffect(() => {
        setViewport({ ...viewport, latitude: lat, longitude: lng });
    }, [lat, lng]);

    useEffect(() => {
        fetchYoutube();
    }, [selectedCountry]);

    return (
        <>
            {loading ? <div className="loading"><span className="loading-icon"><img src={Logo} alt="Geography Now! Loading"></img></span></div> : null}
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
                    // mapboxApiAccessToken={API_KEY}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                    mapStyle='mapbox://styles/metafunistefano/ck8q6qwwi0vr31imu3g7ikcwn'
                >
                    {/* map over all capital cities in the world to display all markers */}

                    {markers && markers.map(el => (
                        <Marker key={el.name} latitude={el.latitude} longitude={el.longitude}>
                            <button className="geo-button" onClick={(e) => {
                                e.preventDefault();
                                !selectedCountry ? setSelectedCountry(el) : setSelectedCountry(null);
                            }}>
                                <img src={Logo} alt={`${el.capital} ${el.name}`} width="20px" style={{ background: 'white', borderRadius: '50%' }}></img>
                            </button>
                        </Marker>
                    ))}

                    {/* display popup when selected */}

                    {selectedCountry &&
                        <Popup
                            className="youtube-popup"
                            latitude={selectedCountry.latitude}
                            longitude={selectedCountry.longitude}
                            onClose={() => { 
                                setSelectedCountry(null);
                                setVideoURL(null);
                            }}
                        >
                            {/* <h3>{selectedCountry.name} <span style={{ fontStyle: 'italic' }}>({selectedCountry.capital})</span></h3> */}
                            {videoURL && setSelectedCountry ?
                                <div className="youtube-container">
                                    <iframe
                                        width="450"
                                        height="250"
                                        title="Geography Now! Episode"
                                        src={videoURL}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                                :
                                <p>WOOops.. :(<br></br>
                                    No Geography Now episode for {selectedCountry.name} yet peeps ...</p>
                            }
                        </Popup>}
                </ReactMapGl>
            </div>
        </>
    )
}

export default GeoMap;
