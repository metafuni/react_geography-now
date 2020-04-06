import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import Axios from 'axios';

import Logo from '../../img/logo.png'

const CapitalMap = ({ country }) => {

    const API_KEY = 'pk.eyJ1IjoibWV0YWZ1bmlzdGVmYW5vIiwiYSI6ImNrOGl2ZDZjdTAzYXczZW55aTl6aHl5MHYifQ.e4hq7DmvQFFATjKR24028A';

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [selected, setSelected] = useState(false);

    const [teleportUrl, setTeleportUrl] = useState(`https://api.teleport.org/api/urban_areas/slug:${country.capital.toLowerCase()}/scores/`);
    const [teleportImg, setTeleportImg] = useState([]);
    const [teleportData, setTeleportData] = useState([]);

    const [viewport, setViewport] = useState({
        width: 1050,
        height: 650,
        latitude: lat,
        longitude: lng,
        zoom: 6
    });

    //get coordinates of capital city
    const getCoord = async () => {
        if (country.capital) {
            const result = await Axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country.capital}.json?&country=${country.alpha2Code}&access_token=${API_KEY}`);
            if (result.data.features[0]) {
                setLat(result.data.features[0].center[1]);
                setLng(result.data.features[0].center[0]);
            } else {
                setLat(country.latlng[0]);
                setLng(country.latlng[1]);
            };
        } else {
            setLat(country.latlng[0]);
            setLng(country.latlng[1]);
        };
    };

    //alternative JS promise handling:

    // const getCoord = () => {
    //     if (country.capital) {
    //         Axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country.capital}.json?&country=${country.alpha2Code}&access_token=${API_KEY}`)
    //             .then(function (result) {
    //                 if (result.data.features[0].center[0] && result.data.features[0].center[1]) {
    //                     setLat(result.data.features[0].center[1]);
    //                     setLng(result.data.features[0].center[0]);
    //                 } else {
    //                     setLat(country.latlng[0]);
    //                     setLng(country.latlng[1]);
    //                 };
    //             })
    //             .catch(function (error) {
    //                 console.log(error)
    //                 setLat(country.latlng[0]);
    //                 setLng(country.latlng[1]);
    //             })
    //     } else {
    //         setLat(country.latlng[0]);
    //         setLng(country.latlng[1]);
    //     };
    // };

    const fetchCountryWikiInfo = () => {
        //Wikipedia
        //fetch summary data from wikipedia API
        let url = "https://en.wikipedia.org/w/api.php";

        //url parameters, with maximum 2 sentences of the intro section on the Wikipedia page
        let params = {
            action: "query",
            titles: country.capital,
            prop: "extracts",
            format: "json",
            exintro: true,
            exsentences: 2
        };

        //loop over object parameter keys and append to base url
        url = url + "?origin=*";
        Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

        //fetch the url and avoid 'did you mean?' pages by setting minimum amount of characters to 50
        fetch(url)
            .then(function (response) { return response.json(); })
            .then(function (response) {
                if (response.query.pages[Object.keys(response.query.pages)[0]].extract && response.query.pages[Object.keys(response.query.pages)[0]].extract.length > 50) {
                    document.getElementById('wiki-info').innerHTML = response.query.pages[Object.keys(response.query.pages)[0]].extract;
                }
            })
            .catch(function (error) { console.log(error); });
    };

    const fetchCountryTeleportInfo = async () => {
        const scoresresult = await Axios(`https://api.teleport.org/api/urban_areas/slug:${country.capital.toLowerCase()}/scores/`);
        if (scoresresult.data.summary) {
            document.getElementById('teleport-info').innerHTML = scoresresult.data.summary;
            setTeleportData(teleportData => [...teleportData, {
                housing: scoresresult.data.categories[0],
                col: scoresresult.data.categories[1],
                safety: scoresresult.data.categories[7],
                healthcare: scoresresult.data.categories[8],
                education: scoresresult.data.categories[9],
                environment: scoresresult.data.categories[10],
                economy: scoresresult.data.categories[11],
                leisure: scoresresult.data.categories[14]
            }]);
        };
        console.log(scoresresult.data);

        const imgresult = await Axios(`https://api.teleport.org/api/urban_areas/slug:${country.capital.toLowerCase()}/images/`);
        if (imgresult.data.photos[0].image.web) {
            setTeleportImg(teleportImg => [...teleportImg, { img: imgresult.data.photos[0].image.web }]);
        };
    };


    useEffect(() => {
        getCoord();
        console.log(teleportData);
    });

    useEffect(() => {
        setSelected(false);
        setTeleportData([]);
        setTeleportImg([]);
    }, [country]);

    useEffect(() => {
        setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 6 });
    }, [lat, lng]);

    return (
        <div className="capitalmap">
            <ReactMapGl
                className="mapview"
                {...viewport}
                onViewportChange={(viewport) => { setViewport(viewport) }}
                mapboxApiAccessToken={API_KEY}
                mapStyle='mapbox://styles/metafunistefano/ck8iw9s0y08xf1iqvywbh9jnt'
            >
                {lat && lng && <Marker key={country.name} latitude={lat} longitude={lng}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setSelected(!selected);
                        if (!selected) {
                            // fetchCountryWikiInfo();
                            fetchCountryTeleportInfo();
                        };
                    }}>
                        <img src={Logo} alt={`${country.capital} ${country.name}`} style={{ borderRadius: '50%' }} width="50px"></img>
                    </button>
                </Marker>}
                {selected && (
                    <Popup
                        latitude={lat}
                        longitude={lng}
                        onClose={() => setSelected(false)}
                    >
                        <div className="capital-info">
                            <h3>
                                <img src={country.flag} alt={country.name} height="20px"></img>
                                <span> {country.name}</span> {country.capital && <span style={{ fontStyle: 'italic' }}>({country.capital})</span>}
                            </h3>

                            {/* <div id="wiki-info"></div><span></span> */}

                            <div id="teleport-info"></div>
                            {teleportImg[0] && <img src={teleportImg[0].img} alt={country.capital} width="100%"></img>}

                            <div className="teleport-data">

                                {/* First container */}

                                <div className="charts-container">
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].housing.color}`,
                                                    width: `${teleportData[0].housing[Object.keys(teleportData[0].housing)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].housing.color}, -1px 1px 5px ${teleportData[0].housing.color}, -1px -1px 5px ${teleportData[0].housing.color}, 1px -1px 5px ${teleportData[0].housing.color}`
                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].housing.name}</span>
                                            <div>{Math.floor(teleportData[0].housing[Object.keys(teleportData[0].housing)[2]] * 100) / 10} %</div>
                                        </div>}
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].col.color}`,
                                                    width: `${teleportData[0].col[Object.keys(teleportData[0].col)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].col.color}, -1px 1px 5px ${teleportData[0].col.color}, -1px -1px 5px ${teleportData[0].col.color}, 1px -1px 5px ${teleportData[0].col.color}`

                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].col.name}</span>
                                            <div>{Math.floor(teleportData[0].col[Object.keys(teleportData[0].col)[2]] * 100) / 10} %</div>
                                        </div>}
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].safety.color}`,
                                                    width: `${teleportData[0].safety[Object.keys(teleportData[0].safety)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].safety.color}, -1px 1px 5px ${teleportData[0].safety.color}, -1px -1px 5px ${teleportData[0].safety.color}, 1px -1px 5px ${teleportData[0].safety.color}`

                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].safety.name}</span>
                                            <div>{Math.floor(teleportData[0].safety[Object.keys(teleportData[0].safety)[2]] * 100) / 10} %</div>
                                        </div>}
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].healthcare.color}`,
                                                    width: `${teleportData[0].healthcare[Object.keys(teleportData[0].healthcare)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].healthcare.color}, -1px 1px 5px ${teleportData[0].healthcare.color}, -1px -1px 5px ${teleportData[0].healthcare.color}, 1px -1px 5px ${teleportData[0].healthcare.color}`

                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].healthcare.name}</span>
                                            <div>{Math.floor(teleportData[0].healthcare[Object.keys(teleportData[0].healthcare)[2]] * 100) / 10} %</div>
                                        </div>}
                                </div>

                                {/* Second container */}

                                <div className="charts-container">
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].education.color}`,
                                                    width: `${teleportData[0].education[Object.keys(teleportData[0].education)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].education.color}, -1px 1px 5px ${teleportData[0].education.color}, -1px -1px 5px ${teleportData[0].education.color}, 1px -1px 5px ${teleportData[0].education.color}`

                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].education.name}</span>
                                            <div>{Math.floor(teleportData[0].education[Object.keys(teleportData[0].education)[2]] * 100) / 10} %</div>
                                        </div>}
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].environment.color}`,
                                                    width: `${teleportData[0].environment[Object.keys(teleportData[0].environment)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].environment.color}, -1px 1px 5px ${teleportData[0].environment.color}, -1px -1px 5px ${teleportData[0].environment.color}, 1px -1px 5px ${teleportData[0].environment.color}`

                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].environment.name}</span>
                                            <div>{Math.floor(teleportData[0].environment[Object.keys(teleportData[0].environment)[2]] * 100) / 10} %</div>
                                        </div>}                                    {teleportData[0] &&
                                            <div className="chart">
                                                <div
                                                    style={{
                                                        backgroundColor: `${teleportData[0].economy.color}`,
                                                        width: `${teleportData[0].economy[Object.keys(teleportData[0].economy)[2]]}rem`,
                                                        boxShadow: `1px 1px 5px ${teleportData[0].economy.color}, -1px 1px 5px ${teleportData[0].economy.color}, -1px -1px 5px ${teleportData[0].economy.color}, 1px -1px 5px ${teleportData[0].economy.color}`

                                                    }}
                                                    className="bar"
                                                >
                                                </div>
                                                <span>{teleportData[0].economy.name}</span>
                                                <div>{Math.floor(teleportData[0].economy[Object.keys(teleportData[0].economy)[2]] * 100) / 10} %</div>
                                            </div>}
                                    {teleportData[0] &&
                                        <div className="chart">
                                            <div
                                                style={{
                                                    backgroundColor: `${teleportData[0].leisure.color}`,
                                                    width: `${teleportData[0].leisure[Object.keys(teleportData[0].leisure)[2]]}rem`,
                                                    boxShadow: `1px 1px 5px ${teleportData[0].leisure.color}, -1px 1px 5px ${teleportData[0].leisure.color}, -1px -1px 5px ${teleportData[0].leisure.color}, 1px -1px 5px ${teleportData[0].leisure.color}`

                                                }}
                                                className="bar"
                                            >
                                            </div>
                                            <span>{teleportData[0].leisure.name}</span>
                                            <div>{Math.floor(teleportData[0].leisure[Object.keys(teleportData[0].leisure)[2]] * 100) / 10} %</div>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </Popup>)}
            </ReactMapGl>
        </div>
    )
}

export default CapitalMap;
