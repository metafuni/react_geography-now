import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import CountryImg from '../Quiz/CountryImg';
import Weather from './Weather';
import Currency from './Currency';
import CapitalMap from './CapitalMap';
import Logo from '../../img/logo.png';

const Card = ({ country }) => {

    const [borders, setBorders] = useState([]);
    const [loading, setLoading] = useState(true);

    const convertBorders = async (code) => {
        const result = await Axios(`https://restcountries.eu/rest/v2/alpha/${code.toLowerCase()}`);
        setBorders(borders => [...borders, {
            name: result.data.name,
            flag: result.data.flag
        }]);
    };

    useEffect(() => {
        if (country.borders) {
            setBorders([]);
            country.borders.forEach((el) => {
                convertBorders(el.toLowerCase());
            });
        };
    }, [country.borders]);

    useEffect(() => {
        //Highlight country in world map svg
        const allElements = document.querySelectorAll("path");

        allElements.forEach(el => {
            el.setAttribute("fill", "grey");
        });

        if (country.alpha2Code) {
            const code = country.alpha2Code.toLowerCase();
            const element = document.getElementById(`${code}`);

            if (element) {
                element.setAttribute("fill", "#01aaad");
                element.querySelectorAll("path").forEach(el => {
                    el.setAttribute("fill", "#01aaad");
                });
            } if (element !== document.getElementById(`${code}`)) {
                element.setAttribute("fill", "grey");
                element.querySelectorAll("path").forEach(el => {
                    el.setAttribute("fill", "grey");
                });
            };
        }
        setLoading(false);
    }, [country.alpha2Code]);

    return (
        <div>
            {loading ? <div className="loading"><span className="loading-icon"><img src={Logo} alt="Geography Now! Loading"></img></span></div> : null}
            <div className="card">
                {country.name &&
                    <div className="card-container">
                        <div className="card-inner-container">
                            <div className="card-header-container">

                                {/* Header */}

                                <div className="country-header">
                                    {country.name ? <div><h1>{country.name}</h1><h3>{country.altSpellings[country.altSpellings.length - 1]}, {country.nativeName}</h3></div> : null}
                                </div>
                            </div>

                            {/* Image */}

                            <div className="country-images">
                                {country.flag ? <img src={country.flag} alt={country.name} width="75%"></img> : null}
                            </div>

                            {/* Info Container */}

                            <div className="info-container">
                                <div className="info-card">
                                    {country.capital ? <div>Capital<br></br><span>{country.capital}</span></div> : null}
                                    {country.region ? <div>Region<br></br><span>{country.subregion} ({country.region})</span></div> : null}
                                    {country.population ? <div>Population<br></br><span>{parseFloat(country.population).toLocaleString('en')}</span></div> : null}
                                    {country.area ? <div>Total area<br></br><span>{parseFloat(country.area).toLocaleString('en')} km&sup2;</span></div> : null}
                                </div>
                                <Currency country={country} />
                            </div>
                        </div>

                        {/* Info Buttons */}

                        {country.name ?
                            <div className="info-buttons">
                                <button className="btn btn-info" id="timezone-info" onClick={() => {
                                    if (document.querySelector('.timezone-info').style.display === 'block') {
                                        document.querySelector('.timezone-info').style.display = 'none';
                                        document.querySelector(".fa-clock").style.color = '#01aaad';
                                    } else {
                                        document.querySelector('.timezone-info').style.display = 'block';
                                        document.querySelector(".fa-clock").style.color = '#3ab54a';
                                    }
                                }}>
                                    <i className="far fa-clock fa-2x"></i>
                                </button>
                                <button className="btn btn-info" id="regionalbloc" onClick={() => {
                                    if (document.querySelector('.regionalbloc').style.display === 'block') {
                                        document.querySelector('.regionalbloc').style.display = 'none';
                                        document.querySelector(".fa-landmark").style.color = '#01aaad';
                                    } else {
                                        document.querySelector('.regionalbloc').style.display = 'block';
                                        document.querySelector(".fa-landmark").style.color = '#3ab54a';
                                    }
                                }}>
                                    <i className="fas fa-landmark fa-2x"></i>
                                </button>
                                <button className="btn btn-info" id="language-info" onClick={() => {
                                    if (document.querySelector('.language-info').style.display === 'block') {
                                        document.querySelector('.language-info').style.display = 'none';
                                        document.querySelector(".fa-language").style.color = '#01aaad';

                                    } else {
                                        document.querySelector('.language-info').style.display = 'block';
                                        document.querySelector(".fa-language").style.color = '#3ab54a';
                                    }
                                }}>
                                    <i className="fas fa-language fa-2x"></i>
                                </button>
                                <button className="btn btn-info" id="telephone-info" onClick={() => {
                                    if (document.querySelector('.telephone-info').style.display === 'block') {
                                        document.querySelector('.telephone-info').style.display = 'none';
                                        document.querySelector(".fa-phone").style.color = '#01aaad';

                                    } else {
                                        document.querySelector('.telephone-info').style.display = 'block';
                                        document.querySelector(".fa-phone").style.color = '#3ab54a';
                                    }
                                }}>
                                    <i className="fas fa-phone fa-2x"></i>
                                </button>
                            </div> :
                            null
                        }

                        {/* Info Modals */}

                        <div className="info-modals">
                            <div className="info-card timezone-info">
                                {country.name && country.timezones.length === 1 ?
                                    <p>Timezone <span>{country.timezones[0]}</span></p> :
                                    null
                                }
                                {country.name && country.timezones.length > 1 ?
                                    <p>Timezones <span>{country.timezones[0]}</span> to <span>{country.timezones[country.timezones.length - 1]}</span></p> :
                                    null
                                }
                            </div>
                            <div className="info-card regionalbloc">
                                {country.name && country.regionalBlocs.length > 0 ?
                                    <p>{country.name} belongs to the {country.regionalBlocs[0].name} <span className="alternative-text">(or {country.regionalBlocs[0].acronym})</span></p> :
                                    null
                                }
                                {country.name && country.regionalBlocs.length === 0 ?
                                    <p>{country.name} is completely independent and does not belong to any political or economic union!</p> :
                                    null
                                }
                            </div>
                            <div className="info-card language-info">
                                {country.name && country.languages.length === 1 ?
                                    <p>The native language spoken in {country.name} is {country.languages[0].name} {country.languages[0].nativeName ? <span className="alternative-text">({country.languages[0].nativeName})</span> : null}</p> :
                                    null
                                }
                                {country.name && country.languages.length === 2 ?
                                    <p>{country.name} has two native languages: {country.languages[0].name} {country.languages[0].nativeName ? <span className="alternative-text">({country.languages[0].nativeName})</span> : null} and {country.languages[1].name} {country.languages[0].nativeName ? <span className="alternative-text">({country.languages[1].nativeName})</span> : null}</p> :
                                    null
                                }
                                {country.name && country.languages.length > 2 ?
                                    <div>{country.demonym} people speak {country.languages.length} different languages. <br></br>These are:<br></br><br></br>
                                        <ul>
                                            {country.languages.map(el => <li key={Math.random()}>{el.name} {el.nativeName ? <span className="alternative-text">({el.nativeName})</span> : null}</li>)}
                                        </ul>
                                    </div> :
                                    null
                                }
                            </div>
                            <div className="info-card telephone-info">
                                {country.name && country.callingCodes ? <p>The country code for calling {country.demonym} phonenumbers is <span>+{country.callingCodes[0]}</span></p> : null}
                            </div>
                        </div>

                        <CountryImg />

                        {/* Map */}
                        <div className="map">
                            <div className="info-card map-box">
                                {country.name && <h5>{country.name} <span>({country.nativeName})</span></h5>}<br></br>
                                {country.latlng && <p>Latitude <span>{country.latlng[0]}&deg; N</span></p>}
                                {country.latlng && <p>Longitude <span>{country.latlng[1]}&deg; E</span></p>}
                            </div>
                            {country.borders.length > 0 &&
                                <div className="info-card borders-box">
                                    <h5>Land Borders</h5><br></br>
                                    {borders.map(el => (
                                        //each ul, li and span requires an unique key value, to avoid any warnings set key as Math.random()
                                        <ul key={el.name}>
                                            <li key={Math.random()}>
                                                <img src={el.flag} alt={el.name} height="15px"></img>
                                                <span key={Math.random()}>{el.name}</span>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            }
                            <Weather country={country} />
                        </div>
                    </div>
                }
            </div>
            {country.name && country.latlng[0] && <CapitalMap country={country} />}
        </div >
    )
};

export default Card;