import React, { useState } from 'react';

import Logo from '../../img/logo.png';

const Card = ({ loading, country }) => {

    return (
        <div className="card">
            {loading ? <div className="loading"><span className="loading-icon"><img src={Logo} alt="Geography Now! Loading"></img></span></div> : null}

            <div className="card-container">
                <div className="card-inner-container">
                    <div className="card-header-container">
                        <div className="country-header">
                            {country.name ? <div><h1>{country.name}</h1><h3>{country.altSpellings[country.altSpellings.length - 1]}, {country.nativeName}</h3></div> : null}
                        </div>
                        {country.name ?
                            <div className="info-buttons">
                                <button className="btn btn-info">
                                    <i className="far fa-clock fa-2x"></i>
                                </button>
                                <button className="btn btn-info">
                                    <i className="fas fa-landmark fa-2x"></i>
                                </button>
                                <button className="btn btn-info">
                                    <i className="fas fa-language fa-2x"></i>
                                </button>
                                <button className="btn btn-info">
                                    <i className="fas fa-phone fa-2x"></i>
                                </button>
                            </div> :
                            null
                        }
                    </div>
                    <div className="country-images">
                        {country.flag ? <img src={country.flag} alt={country.name} width="500px"></img> : null}
                    </div>
                    <div className="info-card">
                        {country.capital ? <div>Capital<br></br><span>{country.capital}</span></div> : null}
                        {country.region ? <div>Region<br></br><span>{country.subregion}, {country.region}</span></div> : null}
                        {country.population ? <div>Population<br></br><span>{parseFloat(country.population).toLocaleString('en')}</span></div> : null}
                        {country.area ? <div>Total area<br></br><span>{parseFloat(country.area).toLocaleString('en')} km&sup2;</span></div> : null}
                    </div>
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
                    <div className="info-card currency-card">

                    </div>
                </div>
            </div>

        </div>
    )
};

export default Card;