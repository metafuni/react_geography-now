import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import CountryImg from './CountryImg';
import Logo from '../../img/logo.webp';

import Input from './Input';
import Results from './Results';

const Quiz = () => {

    let countriesArray = [];

    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [countries, setCountries] = useState();
    const [loading, setLoading] = useState(true);

    //set countriesArray
    const getCountries = async () => {
        const result = await Axios(`https://restcountries.eu/rest/v2/all`);
        result.data.forEach(el => {
            //set name with alternative names and translated names for the quiz, flag and region
            countriesArray.push({
                name: [el.name, el.nativeName, el.translations.de, el.translations.es, el.translations.fr, el.translations.ja, el.translations.it, el.translations.br, el.translations.pt, el.translations.nl, el.translations.hr, el.translations.fa],
                flag: el.flag,
                region: el.region,
                id: el.alpha2Code,
                completed: false
            });

            //add alternative/easier names for countries
            switch (el.alpha2Code) {
                case 'SY':
                    countriesArray[countriesArray.length - 1].name.push("Syria");
                    break;
                case 'VG':
                    countriesArray[countriesArray.length - 1].name.push("Virgin Islands");
                    break;
                case 'VI':
                    countriesArray[countriesArray.length - 1].name.push("American Virgin Islands");
                    countriesArray[countriesArray.length - 1].name.push("US Virgin Islands");
                    break;
                case 'BL':
                    countriesArray[countriesArray.length - 1].name.push("Saint Barthelemy");
                    break;
                case 'KR':
                    countriesArray[countriesArray.length - 1].name.push("South Korea");
                    break;
                case 'KP':
                    countriesArray[countriesArray.length - 1].name.push("North Korea");
                    break;
                case 'CC':
                    countriesArray[countriesArray.length - 1].name.push("Cocos Islands");
                    break;
                case 'CF':
                    countriesArray[countriesArray.length - 1].name.push("CAR");
                    break;
                case 'GW':
                    countriesArray[countriesArray.length - 1].name.push("Guinea Bissau");
                    break;
            };

            let altArray = el.altSpellings;
            altArray.shift();
            altArray.forEach(el => countriesArray[countriesArray.length - 1].name.push(el));
        });
        setLoading(false);
    };

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
                    result = testString.match(inputString);
                } else {
                    result = null;
                };

                const code = countriesArray[i].id.toLowerCase();
                const element = document.getElementById(`${code}`);

                //answer correct, in case country does not exist on map, set score and empty input field
                if (result !== null && result[0] === testString && !element) {

                    //check if not already in answers
                    if (answers.length > 0) {
                        for (let x = 0; x < answers.length; x++) {
                            if (countriesArray[i].name[0] === answers[x].name[0]) {
                                return;
                            };
                        };
                    };

                    //amend the countriesArray
                    // countriesArray.filter(el => el === countriesArray[i]);

                    // answer correct, set score, empty input field, mark country on map and trigger animations
                    setScore(score + 1);
                    setAnswers([...answers, countriesArray[i]]);
                    e.target.value = '';

                    //add animation green color when answer is correct
                    const input = document.getElementById('inputbox');
                    input.style.animationName = 'score';
                    setTimeout(() => {
                        input.style.animationName = 'none';
                    }, 1000);

                    const scorebox = document.querySelector(".score-box");
                    scorebox.style.backgroundColor = '#3ab54a';
                    setTimeout(() => {
                        scorebox.style.backgroundColor = '#01aaad';
                    }, 1000);
                };

                //answer correct, in case country existing on map
                if (result !== null && result[0] === testString && element) {

                    //check if not already in answers
                    if (answers.length > 0) {
                        for (let x = 0; x < answers.length; x++) {
                            if (countriesArray[i].name[0] === answers[x].name[0]) {
                                return;
                            };
                        };
                    };

                    setScore(score + 1);
                    //test
                    setAnswers([...answers, countriesArray[i]]);
                    e.target.value = '';

                    //amend the countriesArray
                    // countriesArray.filter(el => el === countriesArray[i]);
                    console.log(countriesArray[i]);

                    //mark country green on map
                    if (element) {
                        element.setAttribute("fill", "#3ab54a");
                        element.querySelectorAll("path").forEach(el => {
                            el.setAttribute("fill", "#3ab54a");
                        });
                    };

                    //add animation green color when answer is correct
                    const input = document.getElementById('inputbox');
                    input.style.animationName = 'score';
                    setTimeout(() => {
                        input.style.animationName = 'none';
                    }, 1000);

                    const scorebox = document.querySelector(".score-box");
                    scorebox.style.backgroundColor = '#3ab54a';
                    setTimeout(() => {
                        scorebox.style.backgroundColor = '#01aaad';
                    }, 1000);
                }
            }
        }
    };

    //reset score when game has ended/play again
    const resetScore = () => {
        setScore(0);

        //test
        setAnswers([]);
        countriesArray = [];
        getCountries();
        setCountries(countriesArray);

        //set background color for world map svg to default grey
        const allElements = document.querySelectorAll("path");
        allElements.forEach(el => {
            el.setAttribute("fill", "grey");
        });

        //clear results
        const countryLi = document.querySelectorAll(".country-li");
        countryLi.forEach(el => el.style.display = 'none');
    };

    useEffect(() => {
        // set the countries array
        getCountries();
    }, [resetScore]);

    return (
        <>
            {loading ? <div className="loading"><span className="loading-icon"><img src={Logo} alt="Geography Now! Loading"></img></span></div> : null}
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
                <Results answers={answers} countriesArray={countriesArray} resetScore={resetScore} countries={countries} />
            </div>
        </>
    )
}

export default Quiz;