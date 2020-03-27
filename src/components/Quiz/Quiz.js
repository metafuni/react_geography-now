import React, { useState, useEffect } from 'react';
import CountryImg from './CountryImg';

import Input from './Input';
import Axios from 'axios';

const Quiz = () => {

    const [timer, setTimer] = useState(15);
    const [score, setScore] = useState(0);

    const countriesArray = [];

    //set countriesArray
    const getCountries = async () => {
        const result = await Axios(`https://restcountries.eu/rest/v2/all`);
        result.data.forEach(el => {
            countriesArray.push(el.name);
        });
    };
    console.log(score);

    //check the input answer if correct
    const checkAnswer = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        for (let i = 0; i < countriesArray.length; i++) {
            if (e.target.value === countriesArray[i]) {
                console.log('BINGO');
                setScore(score+1);
                console.log(score);
                e.target.value = '';
            };
        };
    };

    useEffect(() => {
        //set background color for world map svg
        const allElements = document.querySelectorAll("path");
        allElements.forEach(el => {
            el.setAttribute("fill", "grey");
        })

        //set all countries array
        getCountries();
    });

    return (
        <div className="quiz">
            <div className="header">
                <h1>
                    <span className="elearn">
                        <span className="e">
                            e <i className="fas fa-graduation-cap"></i>
                        </span>
                        learn
                    </span>
                    Quiz
                </h1>
            </div>
            <Input checkAnswer={checkAnswer}/>
            <CountryImg />
        </div>
    )
}

export default Quiz;