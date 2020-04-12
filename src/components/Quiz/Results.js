  
import React, { useState, useEffect } from 'react';

const Results = ({ answers, countriesArray, resetScore, countries }) => {

    if (countries && answers) {
        for (let i = 0; i < countries.length; i++) {
            answers.forEach(el => {
                if (el.name[0] === countries[i].name[0]) {
                    countries.splice(i, 1);
                };
            });
        };
    };

    return (
        <div className="results">
            <div className="results-top">
                <div className="result-box americas">
                    <h3>Americas</h3>
                    <ul>
                        <br></br>
                        {answers && answers.map(el => {
                            if (el.region === 'Americas') {
                                return <li className="answer-li" key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries && countries.map(el => {
                            if (el.region === 'Americas') {
                                return <li className="country-li" key={el.id} style={{ color: '#1c166be6' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box europe">
                    <h3>Europe</h3>
                    <ul>
                        <br></br>
                        {answers && answers.map(el => {
                            if (el.region === 'Europe') {
                                return <li className="answer-li" key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries && countries.map(el => {
                            if (el.region === 'Europe') {
                                return <li className="country-li" key={el.id} style={{ color: '#1c166be6' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box africa">
                    <h3>Africa</h3>
                    <ul>
                        <br></br>
                        {answers && answers.map(el => {
                            if (el.region === 'Africa') {
                                return <li className="answer-li" key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries && countries.map(el => {
                            if (el.region === 'Africa') {
                                return <li className="country-li" key={el.id} style={{ color: '#1c166be6' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
            </div>
            <div className="results-bottom">
                <div className="result-box asia">
                    <h3>Asia</h3>
                    <ul>
                        <br></br>
                        {answers && answers.map(el => {
                            if (el.region === 'Asia') {
                                return <li className="answer-li" key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries && countries.map(el => {
                            if (el.region === 'Asia') {
                                return <li className="country-li" key={el.id} style={{ color: '#1c166be6' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box oceania">
                    <h3>Oceania</h3>
                    <ul>
                        <br></br>
                        {answers && answers.map(el => {
                            if (el.region === 'Oceania') {
                                return <li className="answer-li" key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}<br></br>
                        {countries && countries.map(el => {
                            if (el.region === 'Oceania') {
                                return <li className="country-li" key={el.id} style={{ color: '#1c166be6' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
                <div className="result-box polar">
                    <h3>Polar</h3>
                    <ul>
                        <br></br>
                        {answers && answers.map(el => {
                            if (el.region === 'Polar') {
                                return <span className="answer-li" key={el.id} style={{ color: '#3ab54a' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</span>
                            };
                        })}<br></br>
                        {countries && countries.map(el => {
                            if (el.region === 'Polar') {
                                return <li className="country-li" key={el.id} style={{ color: '#1c166be6' }}><img src={el.flag} alt={el.name[0]}></img>{el.name[0]}</li>
                            };
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Results;