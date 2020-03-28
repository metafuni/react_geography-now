import React, { useState, useEffect } from 'react';
import CountryImg from './CountryImg';

import Input from './Input';
import Axios from 'axios';

const Quiz = () => {

    const [timer, setTimer] = useState(15);
    const [score, setScore] = useState(0);

    let countriesArray = [];

    //set countriesArray
    const getCountries = async () => {
        const result = await Axios(`https://restcountries.eu/rest/v2/all`);
        result.data.forEach(el => {
            //set name with alternative names and translated names for the quiz, flag and region
            countriesArray.push({
                name: [el.name, el.nativeName, el.translations.de, el.translations.es, el.translations.fr, el.translations.ja, el.translations.it, el.translations.br, el.translations.pt, el.translations.nl, el.translations.hr, el.translations.fa],
                flag: el.flag,
                region: el.region,
                id: el.alpha2Code
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

        //define regular expression input string
        let inputString = new RegExp(e.target.value, "i");

        // loop through all country names in array and match regular expression if exists
        for (let i = 0; i < countriesArray.length; i++) {
            for (let j = 0; j < countriesArray[i].name.length; j++) {
                let testString = countriesArray[i].name[j];
                let result;
                if (testString) {
                    result = testString.match(inputString)
                } else {
                    result = null;
                };

                // answer correct, set score, empty input field, mark country on map and trigger animations
                if (result !== null && result[0] === testString) {
                    setScore(score + 1);
                    e.target.value = '';

                    //mark country green on map
                    const code = countriesArray[i].id.toLowerCase();
                    const element = document.getElementById(`${code}`);
                    if (element) {
                        element.setAttribute("fill", "#3ab54a");
                        element.querySelectorAll("path").forEach(el => {
                            el.setAttribute("fill", "#3ab54a");
                        });
                    };

                    //add animation green color when answer is correct
                    const scorebox = document.querySelector(".score-box");
                    scorebox.style.backgroundColor = '#3ab54a';
                    setTimeout(() => {
                        scorebox.style.backgroundColor = '#01aaad';
                    }, 1000);                    
                }
            }
        }
    };

    useEffect(() => {
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
            <div className="score-box">score: <span style={{ color: 'white' }} id="score">{score}</span></div>
            <CountryImg />
        </div>
    )
}

export default Quiz;