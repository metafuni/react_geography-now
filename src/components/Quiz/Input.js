import React, { useState } from 'react';
import CountryHover from './CountryHover';

const Input = ({ checkAnswer, score, resetScore, countries, answers }) => {

    const [minutes, setMinutes] = useState(17);
    const [seconds, setSeconds] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [stop, setStop] = useState(false);

    //start quiz, set play
    const startQuiz = () => {
        setPaused(false);

        document.querySelector('.btn-pause').style.backgroundColor = 'white';
        document.querySelector('.fa-pause').style.color = '#01aaad';

        const resultBox = document.querySelectorAll('.result-box');
        resultBox.forEach(el => el.style.display = 'block');

        if (!playing) {
            document.querySelector('.btn-start').style.backgroundColor = '#3ab54a';
            document.querySelector('.fa-play').style.color = 'white';

            //empty inputfield when starting over
            document.getElementById('inputbox').value = '';

            //test
            setPlaying(true);
            setStop(false);
            setMinutes(16);
            setSeconds(59);
            resetScore();
        };
    };

    //pause function
    const updatePause = () => {
        if (playing) {
            setPaused(!paused);

            document.querySelector('.btn-pause').style.backgroundColor = '#01aaad';
            document.querySelector('.fa-pause').style.color = 'white';

            document.querySelector(".quiz-timer").style.animationName = 'none';

            if (paused) {
                document.querySelector('.btn-pause').style.backgroundColor = 'white';
                document.querySelector('.fa-pause').style.color = '#01aaad';
            };
        };
    };

    //stop function
    const updateStop = () => {
        if (playing) {
            setStop(true);
            setPlaying(false);
            setPaused(false);

            //set styling to default again for buttons input component
            document.querySelector('.question-box').style.display = 'none';
            document.querySelector('.btn-question').style.backgroundColor = 'white';
            document.querySelector('.fa-question').style.color = '#01aaad';

            document.querySelector('.btn-pause').style.backgroundColor = 'white';
            document.querySelector('.fa-pause').style.color = '#01aaad';

            document.querySelector('.btn-start').style.backgroundColor = 'white';
            document.querySelector('.fa-play').style.color = '#3ab54a';

            document.querySelector(".quiz-timer").style.animationName = 'none';

            //reveal missed countries
            const countryLi = document.querySelectorAll(".country-li");
            countryLi.forEach(el => el.style.display = 'flex');

            //set styling for missed countries on map
            const allElements = document.querySelectorAll("path");
            allElements.forEach(el => {
                if (el.getAttribute("fill") !== '#3ab54a') {
                    el.setAttribute("fill", "#ff3c00");
                };
            });
        };
    };

    //timer function
    if (playing && !paused) {
        let timer = setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            };
            if (seconds === 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            };
        }, 1000);

        //time running low
        if (minutes === 0) {
            //orange box shadow time box animation
            document.querySelector(".quiz-timer").style.color = '#ff6600';
            document.querySelector(".quiz-timer").style.animationName = 'timelow';
        };
        if (minutes === 0 && seconds < 15) {
            //red box shadow time box animation
            document.querySelector(".quiz-timer").style.color = 'red';
            document.querySelector(".quiz-timer").style.animationName = 'timeverylow';
            document.querySelector(".quiz-timer").style.animationDuration = '.5s';
        };

        //time up        
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            setPlaying(false);
            setStop(true);

            document.querySelector('.btn-start').style.backgroundColor = 'white';
            document.querySelector('.fa-play').style.color = '#3ab54a';

            document.querySelector(".quiz-timer").style.animationName = 'none';

            //set styling for all countries that were not guessed
            const allElements = document.querySelectorAll("path");
            allElements.forEach(el => {
                if (el.getAttribute("fill") !== '#3ab54a') {
                    el.setAttribute("fill", "#1c166be6");
                };
            });

            //reveal missed countries
            const countryLi = document.querySelectorAll(".country-li");
            countryLi.forEach(el => el.style.display = 'flex');
        };
    };

    //end quiz when all answers correct
    if (score === 250) {
        setPlaying(false);
        setStop(true);
    };

    return (
        //Note that the input will break once you type in a ) or (, anything else permitted
        <div className="input">
            <form onChange={checkAnswer} onSubmit={checkAnswer} autoComplete="off">
                {playing && !paused ?
                    <input id="inputbox" type="text" placeholder="Enter country..." pattern="[A-Za-z]" autoComplete="off"></input> :
                    <input id="inputbox" placeholder="Enter country..." disabled style={{ backgroundColor: '#f6fbff' }}></input>}
            </form>
            <div className="all-buttons">
                <div className="quiz-buttons">
                    <button className="btn btn-question" onClick={() => {
                        if (document.querySelector('.question-box').style.display === 'block') {
                            document.querySelector('.question-box').style.display = 'none';
                            document.querySelector('.btn-question').style.backgroundColor = 'white';
                            document.querySelector('.fa-question').style.color = '#01aaad';
                        } else {
                            document.querySelector('.question-box').style.display = 'block';
                            document.querySelector('.btn-question').style.backgroundColor = '#01aaad';
                            document.querySelector('.fa-question').style.color = 'white';
                        }
                    }}><i className="fas fa-question"></i></button>
                    <div className="question-box">
                        <p>There's no specific order, just try to guess all the countries and independent territories in the world within the time limit</p><br></br>
                        <p>Other languages will be supported soon, but for now the quiz is in English language</p><br></br>
                        <p>Capital letters and punctuation don't matter here</p>

                    </div>
                    <button className="btn btn-pause" onClick={updatePause}><i className="fas fa-pause"></i></button>
                    <button className="btn btn-stop" onClick={updateStop}><i className="fas fa-stop"></i></button>
                </div>
                <div className="right-buttons">
                    <div className="start-button">
                        <button onClick={startQuiz} className="btn btn-start"><i className="fas fa-play"></i></button>
                    </div>
                    {playing && !paused && !stop ?
                        <div className="quiz-timer">
                            {minutes < 10 ? <>0{minutes}</> : minutes}:{seconds < 10 ? <>0{seconds}</> : seconds}
                        </div> :
                        <div className="quiz-timer" style={{ backgroundColor: '#f6fbff', color: 'grey' }}>
                            {minutes < 10 ? <>0{minutes}</> : minutes}:{seconds < 10 ? <>0{seconds}</> : seconds}
                        </div>
                    }
                </div>
            </div>
            {/* <div className="quiz-buttons">
                <button className="btn btn-question" onClick={() => {
                    if (document.querySelector('.question-box').style.display === 'block') {
                        document.querySelector('.question-box').style.display = 'none';
                        document.querySelector('.btn-question').style.backgroundColor = 'white';
                        document.querySelector('.fa-question').style.color = '#01aaad';
                    } else {
                        document.querySelector('.question-box').style.display = 'block';
                        document.querySelector('.btn-question').style.backgroundColor = '#01aaad';
                        document.querySelector('.fa-question').style.color = 'white';
                    }
                }}><i className="fas fa-question"></i></button>
                <div className="question-box">
                    <br></br>
                    <h3>Guess all the countries and territories of the world</h3><br></br>
                    <p>Enter your answers in the <span style={{ fontStyle: 'italic', color: '#5757579d' }}>"Enter country... "</span> input-field, whether it's in English or your own language. <br></br><br></br>
                        There is no specific order, just try to guess all the countries and independent territories in the world within the time limit. <br></br><br></br>Once you hit the stop button after playing we'll reveal all the countries for you. <br></br><br></br>Good luck!<br></br>
                    </p>
                </div>
                <button className="btn btn-pause" onClick={updatePause}><i className="fas fa-pause"></i></button>
                <button className="btn btn-stop" onClick={updateStop}><i className="fas fa-stop"></i></button>
            </div>
            <div className="right-buttons">
                <div className="start-button">
                    <button onClick={startQuiz} className="btn btn-start"><i className="fas fa-play"></i></button>
                </div>
                {playing && !paused && !stop ?
                    <div className="quiz-timer">
                        {minutes < 10 ? <>0{minutes}</> : minutes}:{seconds < 10 ? <>0{seconds}</> : seconds}
                    </div> :
                    <div className="quiz-timer" style={{ backgroundColor: '#f6fbff', color: 'grey' }}>
                        {minutes < 10 ? <>0{minutes}</> : minutes}:{seconds < 10 ? <>0{seconds}</> : seconds}
                    </div>
                }
            </div> */}
            {/* <div className="start-button">
                <button onClick={startQuiz} className="btn btn-start"><i className="fas fa-play"></i></button>
            </div>
            {playing && !paused && !stop ?
                <div className="quiz-timer">
                    {minutes < 10 ? <>0{minutes}</> : minutes}:{seconds < 10 ? <>0{seconds}</> : seconds}
                </div> :
                <div className="quiz-timer" style={{ backgroundColor: '#f6fbff', color: 'grey' }}>
                    {minutes < 10 ? <>0{minutes}</> : minutes}:{seconds < 10 ? <>0{seconds}</> : seconds}
                </div>
            } */}

            {/* TESTCODE */}
            <CountryHover stop={stop} playing={playing} countries={countries} answers={answers} />
            {/* TESTCODE */}

            {/* testcode */}
            {seconds === 0 && minutes === 0 ?
                <div className="time-up-overlay">
                    <div className="time-up-box">
                        <h3>Aaah... time's up!</h3><br></br>
                        <p>Good effort though, you managed to guess <span style={{ color: 'lightgreen', fontSize: '1.25rem' }}>{score}</span> of the total <span style={{ color: 'lightblue', fontSize: '1.25rem' }}>250</span> countries and territories.</p><br></br>
                        <p>Have a look below the map to see an overview of what you missed ...</p>
                        <button className="btn btn-time-up" onClick={() => { document.querySelector(".time-up-overlay").style.display = 'none' }}>close</button>
                        <button className="btn btn-try-again" onClick={() => {
                            document.querySelector(".time-up-overlay").style.display = 'none';
                            startQuiz();
                        }}>try again</button>
                    </div>
                </div> : null}

            {/* testcode */}
            {score === 250 &&
                <div className="winner-overlay">
                    <div className="winner-box">
                        <h3>We have a Winner !!!</h3><br></br>
                        <p>Amazing, you managed to get all the countries and territories: <span style={{ color: 'lightgreen', fontSize: '1.25rem' }}>{score}</span> out of  <span style={{ color: 'lightblue', fontSize: '1.25rem' }}>250</span>.</p><br></br>
                        <p>Consider yourself a true Geograpeeps Master!</p>
                        <button className="btn btn-time-up" onClick={() => { document.querySelector(".winner-overlay").style.display = 'none' }}>close</button>
                        <button className="btn btn-try-again" onClick={() => {
                            document.querySelector(".winner-overlay").style.display = 'none';
                            startQuiz();
                        }}>do it again</button>
                    </div>
                </div>}
        </div>
    )
}

export default Input;