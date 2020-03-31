import React, { useState } from 'react';

const Results = ({ answers, countriesArray }) => {

    const [countries, setCountries] = useState(countriesArray);

    return (
        <div className="results">
            <div className="results-top">
                <div className="result-box americas">
                    <h3>Americas</h3>
                    <ul>
                        {answers.map(el => {
                            if (el.region === 'Americas') {
                            return <li key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries.map(el => {
                            if (el.region === 'Americas') {
                                return <li key={el.id} style={{ color: 'red' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box europe">
                    <h3>Europe</h3>
                    <ul>
                        {answers.map(el => {
                            if (el.region === 'Europe') {
                            return <li key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries.map(el => {
                            if (el.region === 'Europe') {
                                return <li key={el.id} style={{ color: 'red' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box africa">
                    <h3>Africa</h3>
                    <ul>
                        {answers.map(el => {
                            if (el.region === 'Africa') {
                                return <li key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries.map(el => {
                            if (el.region === 'Africa') {
                                return <li key={el.id} style={{ color: 'red' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
            </div>
            <div className="results-bottom">
                <div className="result-box asia">
                    <h3>Asia</h3>
                    <ul>
                        {answers.map(el => {
                            if (el.region === 'Asia') {
                                return <li key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries.map(el => {
                            if (el.region === 'Asia') {
                                return <li key={el.id} style={{ color: 'red' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box oceania">
                    <h3>Oceania</h3>
                    <ul>
                        {answers.map(el => {
                            if (el.region === 'Oceania') {
                                return <li key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries.map(el => {
                            if (el.region === 'Oceania') {
                                return <li key={el.id} style={{ color: 'red' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box polar">
                    <h3>Polar</h3>
                    <ul>
                        {answers.map(el => {
                            if (el.region === 'Polar') {
                                return <span key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</span>
                            };
                        })}<br></br>
                        {countries.map(el => {
                            if (el.region === 'Polar') {
                                return <li key={el.id} style={{ color: 'red' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Results;
