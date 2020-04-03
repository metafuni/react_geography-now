import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Currency = ({ country }) => {
    const [base, setBase] = useState(country.currencies[0].code);
    const [conversion, setConversion] = useState([]);
    const [conversionRate, setConversionRate] = useState([]);
    const [value, setValue] = useState();

    const getCurrencies = async () => {
        const result = await Axios(`https://api.openrates.io/latest?base=${base}`);
        setConversion(conversion => [...conversion, Object.keys(result.data.rates)]);
        setConversionRate(conversionRate => [...conversionRate, result.data.rates]);
    };

    const calculateCurrency = (input) => {
        console.log(input);
        console.log(conversionRate[0]);
        // setValue(conversionRate[0].input);
    };

    useEffect(() => {
        getCurrencies();
    }, [country]);

    return (
        <div className="info-card currency-card">
            <h3>Currency Converter</h3><br></br>
            <p>The {country.demonym} currency is the <span>{country.currencies[0].name} ({country.currencies[0].code})</span></p>
            <div className="currency-container">
                <select disabled>
                    <option value={country.currencies[0].code}>{country.currencies[0].code}</option>
                </select>
                {country.currencies[0].symbol}1
                <i className="fas fa-equals"></i>
                <select onChange={(e) => {
                    calculateCurrency(e.target.value);
                }}>
                    {conversion[0] && conversion[0].map(el => 
                        <option value={el} key={el}>{el}</option>)}
                </select>
                {value && value}
            </div>
        </div>
    )
}

export default Currency
