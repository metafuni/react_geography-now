import React, { useState, useEffect } from 'react';

import Axios from 'axios';

const Weather = ({ country }) => {

    const API_KEY = 'a01cefc7106e1d7afdb0d0742f2190f4';
    const [weather, setWeather] = useState();

    const getWeather = async () => {
        const result = await Axios(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.name}&appid=${API_KEY}&units=metric`);
        setWeather(result.data);
        console.log(weather);
    };

    useEffect(() => {
        getWeather();
    }, [country]);

    return (
        <div className="info-card weather-box">
            <h5>Live weather in <span>{country.capital}</span></h5>
        </div>
    )
}

export default Weather;
