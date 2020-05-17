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

            //add alternative/easier names for countries to make quiz easier to do, we don't need spaces as regex will exclude spaces
            switch (el.alpha2Code) {
                //Europe
                case 'GB':
                    countriesArray[countriesArray.length - 1].name.push("GB");
                    break;
                case 'MK':
                    countriesArray[countriesArray.length - 1].name.push("FYROM");
                    countriesArray[countriesArray.length - 1].name.push("North Macedonia");
                    break;
                case 'BA':
                    countriesArray[countriesArray.length - 1].name.push("Bosnia");
                    countriesArray[countriesArray.length - 1].name.push("Herzegovina");
                    break;
                case 'CZ':
                    countriesArray[countriesArray.length - 1].name.push("Czechia");
                    break;
                case 'LI':
                    countriesArray[countriesArray.length-1].name.push("Lichtenstein");
                //Africa
                case 'CF':
                    countriesArray[countriesArray.length - 1].name.push("CAR");
                    break;
                case 'CD':
                    countriesArray[countriesArray.length - 1].name.push("DRC");
                    break;
                case 'GW':
                    countriesArray[countriesArray.length - 1].name.push("Bissau");
                    countriesArray[countriesArray.length - 1].name.push("Guinea Bissau");
                    break;
                //Americas
                case 'US':
                    countriesArray[countriesArray.length - 1].name.push("United States");
                    countriesArray[countriesArray.length - 1].name.push("US");
                    countriesArray[countriesArray.length - 1].name.push("U.S");
                    break;
                case 'UM':
                    countriesArray[countriesArray.length - 1].name.push("United States Minor Outlying Islands");
                    countriesArray[countriesArray.length - 1].name.push("US Minor Outlying Islands");
                    countriesArray[countriesArray.length - 1].name.push("US Minor Islands");
                    countriesArray[countriesArray.length - 1].name.push("U.S. Minor Outlying Islands");
                    countriesArray[countriesArray.length - 1].name.push("U.S. Minor Islands");
                    countriesArray[countriesArray.length - 1].name.push("U.S Minor Outlying Islands");
                    countriesArray[countriesArray.length - 1].name.push("U.S Minor Islands");
                    countriesArray[countriesArray.length - 1].name.push("United States Minor Islands");
                    countriesArray[countriesArray.length - 1].name.push("Minor Outlying Islands");
                    break;
                case 'FK':
                    countriesArray[countriesArray.length - 1].name.push("Falkland");
                    countriesArray[countriesArray.length - 1].name.push("Malvinas");
                    break;
                case 'VG':
                    countriesArray[countriesArray.length - 1].name.push("Virgin Islands");
                    break;
                case 'VI':
                    countriesArray[countriesArray.length - 1].name.push("American Virgin Islands");
                    countriesArray[countriesArray.length - 1].name.push("US Virgin Islands");
                    countriesArray[countriesArray.length - 1].name.push("United States Virgin Islands");
                    countriesArray[countriesArray.length - 1].name.push("U.S Virgin Islands");
                    countriesArray[countriesArray.length - 1].name.push("U.S. Virgi nIslands");
                    break;
                case 'TT':
                    countriesArray[countriesArray.length - 1].name.push("Trinidad");
                    countriesArray[countriesArray.length - 1].name.push("Tobago");
                    break;
                case 'AG':
                    countriesArray[countriesArray.length - 1].name.push("Antigua");
                    countriesArray[countriesArray.length - 1].name.push("Barbuda");
                    break;
                case 'BQ':
                    countriesArray[countriesArray.length - 1].name.push("Sint Eustatius");
                    countriesArray[countriesArray.length - 1].name.push("Saint Eustatius");
                    countriesArray[countriesArray.length - 1].name.push("St Eustatius");
                    countriesArray[countriesArray.length - 1].name.push("Saba");
                    break;
                //Asia
                case 'SY':
                    countriesArray[countriesArray.length - 1].name.push("Syria");
                    break;
                case 'KR':
                    countriesArray[countriesArray.length - 1].name.push("South Korea");
                    break;
                case 'KP':
                    countriesArray[countriesArray.length - 1].name.push("North Korea");
                    break;
                //Islands
                case 'BL':
                    countriesArray[countriesArray.length - 1].name.push("Saint Barthelemy");
                    countriesArray[countriesArray.length - 1].name.push("St Barthelemy");
                    countriesArray[countriesArray.length - 1].name.push("Barthelemy");
                    break;
                case 'KN':
                    countriesArray[countriesArray.length - 1].name.push("Saint Kitts");
                    countriesArray[countriesArray.length - 1].name.push("Saint Nevis");
                    countriesArray[countriesArray.length - 1].name.push("Kitts and Nevis");
                    countriesArray[countriesArray.length - 1].name.push("St Kitts");
                    break;
                case 'VC':
                    countriesArray[countriesArray.length - 1].name.push("St Vincent");
                    countriesArray[countriesArray.length - 1].name.push("Saint Vincent");
                case 'LC':
                    countriesArray[countriesArray.length - 1].name.push("St Lucia");
                    break;
                case 'SH':
                    countriesArray[countriesArray.length - 1].name.push("St Helena");
                    break;
                case 'MF':
                    countriesArray[countriesArray.length - 1].name.push("St Martin");
                    break;
                case 'GS':
                    countriesArray[countriesArray.length - 1].name.push("Sandwich Islands");
                    break;
                case 'CC':
                    countriesArray[countriesArray.length - 1].name.push("Cocos Islands");
                    break;
                case 'TC':
                    countriesArray[countriesArray.length - 1].name.push("Turks Islands");
                    countriesArray[countriesArray.length - 1].name.push("Caicos Islands");
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

        //define regular expression input string, case insensitive, remove spaces before 'sentence' and replace multiple spaces with single space 
        // let inputString = new RegExp(e.target.value.replace(/\s/g, ''), "i");
        let inputString = new RegExp(e.target.value.trim().replace(/\s\s+/g, ' '), "i");
        //TESTESTEST
        // let inputString = new RegExp(e.target.value.replace(/^\s+|\s+$/g, ""));
        // let trimmedString = e.target.value.trim(); //removes double spaces, case insensitive
        // let inputString = new RegExp(trimmedString.replace(/\s\s+/g, ' ', "i"));


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

    useEffect(() => { console.log(answers) }, [answers]);

    return (
        <>
            {loading ? <div className="loading"><span className="loading-icon"><img src={Logo} alt="Geography Now! Loading"></img></span></div> : null}
            <div id="mobile-message">
                <div>
                    <i className="fas fa-exclamation"></i>
                    <p>The Geography Now! Quiz requires fast typing. We recommend a desktop/laptop version for a better user experience.</p>
                    <button onClick={() => {
                        document.getElementById('mobile-message').style.display = 'none';
                    }}><i className="fas fa-times"></i></button>
                </div>
            </div>
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
                <div style={{ padding: '1rem' }}>
                    <h2>Guess all the countries and territories of the world</h2><br></br>
                    <p>Time to test your geographical knowledge and see how many you can guess! </p><br></br>
                    <p style={{ maxWidth: '900px', margin: '0 auto' }}>Type your answers in the <span style={{ fontStyle: 'italic', color: 'grey' }}>Enter country...</span> field, the countries that you guessed will be marked <span style={{ color: '#3ab54a' }}>green</span> on the map.                 Have a look below the map to keep track of all your answers. Once you hit the stop button after playing we'll reveal all the countries for you. <br></br><br></br>Good luck!<br></br>
                    </p>
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