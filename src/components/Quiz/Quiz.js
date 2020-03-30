import React, { useState, useEffect } from 'react';
import CountryImg from './CountryImg';

import Input from './Input';
import Axios from 'axios';

const Quiz = () => {

    const [score, setScore] = useState(0);

    let countriesArray = [];
    let answerArray = [];

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
                const code = countriesArray[i].id.toLowerCase();
                const element = document.getElementById(`${code}`);

                // STILL TO DO: MAKE SURE THAT WHEN GUESSING THE COUNTRY THAT DOES NOT EXIST ON THE MAP, NOT BEING ABLE TO GUESS AGAIN
                // LOOP THROUGH ALL THE NAMES OF THIS ANSWER AND PUSH THEM ONTO THE ANSWER-ARRAY, WHEN CHECKING FOR THE INPUT, MAKE SURE TO CHECK WITH THIS ANSWER-ARRAY AS WELL

                //in case country does not exist on map, set score and empty input field
                if (result !== null && result[0] === testString && !element) {
                    setScore(score + 1);
                    e.target.value = '';
                };

                if (result !== null && result[0] === testString && element && element.getAttribute('fill') !== '#3ab54a') {
                    setScore(score + 1);
                    answerArray.push(countriesArray[i]);
                    console.log(answerArray);
                    e.target.value = '';

                    //mark country green on map
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

    //reset score when game has ended
    const resetScore = () => {
        setScore(0);

        //set background color for world map svg to default grey
        const allElements = document.querySelectorAll("path");
        allElements.forEach(el => {
            el.setAttribute("fill", "grey");
        });
    };

    useEffect(() => {
        // set the countries array
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
            <Input checkAnswer={checkAnswer} score={score} resetScore={resetScore} />
            <div className="score-box">score: <span style={{ color: 'white' }} id="score">{score} / 250</span></div>
            <CountryImg />
        </div>
    )
}

export default Quiz;