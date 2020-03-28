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
            //set name with alternative names and translated names for the quiz, flag and region
            countriesArray.push({ 
                name: [el.name, el.nativeName, el.translations.de, el.translations.es, el.translations.fr, el.translations.ja, el.translations.it, el.translations.br, el.translations.pt, el.translations.nl, el.translations.hr, el.translations.fa],
                flag: el.flag,
                region: el.region
            });
            let altArray = el.altSpellings;
            altArray.shift();
            altArray.forEach(el => countriesArray[countriesArray.length - 1].name.push(el));
        });
    };
    console.log(score);
    console.log(countriesArray)

    //check the input answer if correct
    const checkAnswer = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        for (let i = 0; i < countriesArray.length; i++) {
            for (let j = 0; j < countriesArray[i].name.length; j++) {
                if (countriesArray[i].name[j] === e.target.value && e.target.value !=='') {
                    console.log('Correct');
                    setScore(score+1);
                    e.target.value = '';
                };
            }
        }
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
            <Input checkAnswer={checkAnswer} />
            <div className="score-box">score: {score}</div>
            <CountryImg />
        </div>
    )
}

export default Quiz;