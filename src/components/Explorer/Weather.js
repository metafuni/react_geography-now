import React, { useState, useEffect } from 'react';

import Axios from 'axios';

const Weather = ({ country }) => {

    const API_KEY = 'a01cefc7106e1d7afdb0d0742f2190f4';
    const [weather, setWeather] = useState();

    const getWeather = async () => {
        const result = await Axios(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.name}&appid=${API_KEY}&units=metric`);
        setWeather({
            description: result.data.weather[0].description,
            temperature: result.data.main.temp,
            wind: result.data.wind,
            humidity: result.data.main.humidity,
            icon: result.data.weather[0].icon
        });
        console.log(result.data);
    };

    useEffect(() => {
        getWeather();
    }, [country]);

    return (
        <>
            {weather &&
                <div className="info-card weather-box">
                    {country.capital && <h5><i className="fas fa-dot-circle"></i>LIVE weather in <span>{country.capital}</span></h5>}
                    {!country.capital && <h5><i className="fas fa-dot-circle"></i>LIVE weather</h5>}

                    <div className="weather-main">
                        {weather.description && <span style={{color: '#5757579d', textTransform: 'capitalize'}}>{weather.description}</span>}
                        {weather.icon && <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />}
                        
                        {weather.temperature && weather.temperature <= 0 && <span style={{color: '#1c166be6'}}>{weather.temperature} &#8451;</span>}
                        {weather.temperature && weather.temperature > 0 && weather.temperature <= 15 && <span style={{color: '#01aaad'}}>{weather.temperature} &#8451;</span>}
                        {weather.temperature && weather.temperature > 15 && weather.temperature <= 30 && <span style={{color: 'orange'}}>{weather.temperature} &#8451;</span>}
                        {weather.temperature && weather.temperature > 30 && <span style={{color: 'red'}}>{weather.temperature} &#8451;</span>}

                    </div>

                    <div className="weather-extra">
                        {weather.humidity && <span style={{color: '#1c166be6'}}><i className="fas fa-tint" style={{color: '#1c166be6'}}></i> {weather.humidity}%</span>}
                        
                        {weather.wind.deg && weather.wind.deg === 0 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> N</span>}
                        {weather.wind.deg && weather.wind.deg === 90 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> E</span>}
                        {weather.wind.deg && weather.wind.deg === 180 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> S</span>}
                        {weather.wind.deg && weather.wind.deg === 270 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> W</span>}

                        {weather.wind.deg && weather.wind.deg > 0 && weather.wind.deg < 90 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> NE</span>}
                        {weather.wind.deg && weather.wind.deg > 90 && weather.wind.deg < 180 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> SE</span>}
                        {weather.wind.deg && weather.wind.deg > 180 && weather.wind.deg < 270 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> SW</span>}
                        {weather.wind.deg && weather.wind.deg > 270 && weather.wind.deg < 360 && <span style={{color: '#3ab54a'}}><i className="fas fa-location-arrow" style={{transform: `rotate(${weather.wind.deg -225}deg)`, color: '#3ab54a'}}></i> NW</span>}

                        {weather.wind.speed && <span style={{color: '#5757579d'}}><i className="fas fa-wind"></i> {weather.wind.speed} m/s</span>}
                    </div>
                </div>
            }
        </>
    )
}

export default Weather;
