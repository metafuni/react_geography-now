import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Currency = ({ country }) => {

    const [base, setBase] = useState(country.currencies[0].code);
    const [conversion, setConversion] = useState([]);
    const [conversionRate, setConversionRate] = useState([]);
    // const [value, setValue] = useState();

    const getCurrencies = async () => {
        const result = await Axios(`https://api.openrates.io/latest?base=${base}`);
        setConversion(conversion => [...conversion, Object.keys(result.data.rates)]);
        setConversionRate(conversionRate => [...conversionRate, result.data.rates]);
    };

    const calculateCurrency = async (input) => {

    };

    useEffect(() => {
        getCurrencies();
    }, []);

    useEffect(() => {
        calculateCurrency();
    }, [country.currencies[0], conversionRate]);

    return (
        <div className="info-card currency-card">
            <h3>Local Currency</h3><br></br>
            <p>The currency used in {country.name} is the <span>{country.currencies[0].name} ({country.currencies[0].code})</span></p>

            <div className="currency-container">
                {country.currencies[0].symbol ?
                    <div>{country.currencies[0].symbol} 1 <i className="fas fa-equals"></i></div>
                    :
                    <div>1 {country.currencies[0].code} <i className="fas fa-equals"></i></div>}
                <select onChange={(e) => {
                    calculateCurrency(e.target.value);
                }}>
                    {conversion[0] && conversion[0].map(el =>
                        <option value={el} key={el}>{el}</option>)}
                </select>
                {/* {value && value} */}
            </div>
        </div>
    )
}

export default Currency
