import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import SymbolData from './currencymap.json';

const Currency = ({ country }) => {

    const [base, setBase] = useState(country.currencies[0].code);
    const [conversion, setConversion] = useState([]);
    const [conversionRate, setConversionRate] = useState([]);
    const [value, setValue] = useState();
    const [symbol, setSymbol] = useState();

    const getCurrencies = async () => {
        setConversion([]);
        setConversionRate([]);
        const result = await Axios(`https://api.openrates.io/latest?base=${base}`);

        setConversion(conversion => [...conversion, Object.keys(result.data.rates)]);
        setConversionRate(conversionRate => [...conversionRate, result.data.rates]);
    };

    const calculateCurrency = async (input) => {
        if (input && conversionRate[0]) {
            switch(input) {
                case 'GBP':
                    setValue(conversionRate[0].GBP);
                    setSymbol(SymbolData.GBP.symbol);
                break;
                case 'HKD':
                    setValue(conversionRate[0].HKD);
                    setSymbol(SymbolData.HKD.symbol);
                break;
                case 'IDR':
                    setValue(conversionRate[0].IDR);
                    setSymbol(SymbolData.IDR.symbol);
                break;
                case 'ILS':
                    setValue(conversionRate[0].ILS);
                    setSymbol(SymbolData.ILS.symbol);
                break;
                case 'DKK':
                    setValue(conversionRate[0].DKK);
                    setSymbol(SymbolData.DKK.symbol);
                break;
                case 'INR':
                    setValue(conversionRate[0].INR);
                    setSymbol(SymbolData.INR.symbol);
                break;
                case 'CHF':
                    setValue(conversionRate[0].CHF);
                    setSymbol(SymbolData.CHF.symbol);
                break;
                case 'MXN':
                    setValue(conversionRate[0].MXN);
                    setSymbol(SymbolData.MXN.symbol);
                break;
                case 'CZK':
                    setValue(conversionRate[0].CZK);
                    setSymbol(SymbolData.CZK.symbol);
                break;
                case 'SGD':
                    setValue(conversionRate[0].SGD);
                    setSymbol(SymbolData.SGD.symbol);
                break;
                case 'THB':
                    setValue(conversionRate[0].THB);
                    setSymbol(SymbolData.THB.symbol);
                break;
                case 'HRK':
                    setValue(conversionRate[0].HRK);
                    setSymbol(SymbolData.HRK.symbol);
                break;
                case 'EUR':
                    setValue(conversionRate[0].EUR);
                    setSymbol(SymbolData.EUR.symbol);
                break;
                case 'MYR':
                    setValue(conversionRate[0].MYR);
                    setSymbol(SymbolData.MYR.symbol);
                break;
                case 'NOK':
                    setValue(conversionRate[0].NOK);
                    setSymbol(SymbolData.NOK.symbol);
                break;
                case 'CNY':
                    setValue(conversionRate[0].CNY);
                    setSymbol(SymbolData.CNY.symbol);
                break;
                case 'BGN':
                    setValue(conversionRate[0].BGN);
                    setSymbol(SymbolData.BGN.symbol);
                break;
                case 'PHP':
                    setValue(conversionRate[0].PHP);
                    setSymbol(SymbolData.PHP.symbol);
                break;
                case 'PLN':
                    setValue(conversionRate[0].PLN);
                    setSymbol(SymbolData.PLN.symbol);
                break;
                case 'ZAR':
                    setValue(conversionRate[0].ZAR);
                    setSymbol(SymbolData.ZAR.symbol);
                break;
                case 'CAD':
                    setValue(conversionRate[0].CAD);
                    setSymbol(SymbolData.CAD.symbol);
                break;
                case 'ISK':
                    setValue(conversionRate[0].ISK);
                    setSymbol(SymbolData.ISK.symbol);
                break;
                case 'BRL':
                    setValue(conversionRate[0].BRL);
                    setSymbol(SymbolData.BRL.symbol);
                break;
                case 'RON':
                    setValue(conversionRate[0].RON);
                    setSymbol(SymbolData.RON.symbol);
                break;
                case 'NZD':
                    setValue(conversionRate[0].NZD);
                    setSymbol(SymbolData.NZD.symbol);
                break;
                case 'TRY':
                    setValue(conversionRate[0].TRY);
                    setSymbol(SymbolData.TRY.symbol);
                break;
                case 'JPY':
                    setValue(conversionRate[0].JPY);
                    setSymbol(SymbolData.JPY.symbol);
                break;
                case 'RUB':
                    setValue(conversionRate[0].RUB);
                    setSymbol(SymbolData.RUB.symbol);
                break;
                case 'KRW':
                    setValue(conversionRate[0].KRW);
                    setSymbol(SymbolData.KRW.symbol);
                break;
                case 'USD':
                    setValue(conversionRate[0].USD);
                    setSymbol(SymbolData.USD.symbol);
                break;
                case 'AUD':
                    setValue(conversionRate[0].AUD);
                    setSymbol(SymbolData.AUD.symbol);
                break;
                case 'HUF':
                    setValue(conversionRate[0].HUF);
                    setSymbol(SymbolData.HUF.symbol);
                break;
                case 'SEK':
                    setValue(conversionRate[0].SEK);
                    setSymbol(SymbolData.SEK.symbol);
                break;
                default:
                return;
            }
        };
    };

    useEffect(() => {
        getCurrencies();
    }, []);

    useEffect(() => {
        if (conversionRate[0]) {
            setValue(conversionRate[0].GBP);
            setSymbol(SymbolData.GBP.symbol);
        }
    }, [conversionRate[0]]);

    useEffect(() => {
        setBase(country.currencies[0].code);
    }, [country]);

    useEffect(() => {
        getCurrencies();
        if (conversionRate[0]) {
            setValue(conversionRate[0].GBP);
            setSymbol(SymbolData.GBP.symbol);
        };
        calculateCurrency('GBP');
    }, [base]);

    useEffect(() => {
        calculateCurrency();
    }, [country.currencies[0], conversionRate]);

    return (
        <div className="info-card currency-card">
            <h3>Local Currency</h3><br></br>
            <p>The currency used in {country.name} is the <span>{country.currencies[0].name} ({country.currencies[0].code})</span></p>

            {conversion.length > 0 && conversionRate.length > 0 && <div className="currency-container">
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
                    {/* set value to 5 decimals accurately */}
                    {value && <span>{symbol} {Math.floor(value*10000000) / 10000000}</span>}
            </div>}
        </div>
    )
}

export default Currency
