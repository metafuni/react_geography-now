import React, { useState, useEffect } from 'react';

const Input = ({ checkAnswer, score, resetScore }) => {

    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [stop, setStop] = useState(false);

    //start quiz, set play
    const startQuiz = () => {
        setPaused(false);

        document.querySelector('.btn-pause').style.backgroundColor = 'white';
        document.querySelector('.fa-pause').style.color = '#01aaad';

        if (!playing) {
            document.querySelector('.btn-start').style.backgroundColor = '#3ab54a';
            document.querySelector('.fa-play').style.color = 'white';

            setPlaying(true);
            setMinutes(14);
            setSeconds(59);
        };
    };

    //pause function
    const updatePause = () => {
        if (playing) {
            setPaused(!paused);

            document.querySelector('.btn-pause').style.backgroundColor = '#01aaad';
            document.querySelector('.fa-pause').style.color = 'white';

            if (paused) {
                document.querySelector('.btn-pause').style.backgroundColor = 'white';
                document.querySelector('.fa-pause').style.color = '#01aaad';
            };
        };
    };

    //stop function
    const updateStop = () => {
        setStop(true);
        setPlaying(false);
        setPaused(false);
        resetScore();

        //set styling to default again
        document.querySelector('.question-box').style.display = 'none';
        document.querySelector('.btn-question').style.backgroundColor = 'white';
        document.querySelector('.fa-question').style.color = '#01aaad';

        document.querySelector('.btn-pause').style.backgroundColor = 'white';
        document.querySelector('.fa-pause').style.color = '#01aaad';

        document.querySelector('.btn-start').style.backgroundColor = 'white';
        document.querySelector('.fa-play').style.color = '#3ab54a';
    };

    //timer function
    //MAKE SURE TO STOP IT ONCE IT HITS 0 FOR BOTH SECONDS AND MINUTES
    if (playing && !paused) {
        setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            };
            if (seconds === 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
            };
        }, 1000);
    };

    //end quiz when all answers correct
    if (score === 250) {

    };

    return (
        <div className="input">
            <form onChange={checkAnswer} onSubmit={checkAnswer}>
                {playing && !paused ? <input id="inputbox" placeholder="Enter country..." autoComplete="off"></input> : <input id="inputbox" placeholder="Enter country..." autoComplete="off" disabled style={{ backgroundColor: '#f6fbff' }}></input>}
            </form>
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
                    <br></br>
                    <h3>Guess all the countries and territories in the world</h3><br></br>
                    <p>Enter your answers in the <span style={{ fontStyle: 'italic', color: '#5757579d' }}>"Enter country... "</span> input-field, whether it's in English or your own language. <br></br><br></br>
                        The input field is case insensitive, so lowercase or uppercase does not matter. <br></br><br></br>
                        There is no specific order, just try to guess all the countries and independent territories in the world within the time limit. <br></br><br></br>Good luck!<br></br>
                    </p>
                </div>
                <button className="btn btn-pause" onClick={updatePause}><i className="fas fa-pause"></i></button>
                <button className="btn btn-stop" onClick={updateStop}><i className="fas fa-stop"></i></button>
            </div>
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

            {/* testcode */}
            {seconds === 0 && minutes === 0 ?
            <div className="time-up-overlay">
                <div className="time-up-box">
                    <h3>Aaah... time's up!</h3><br></br>
                    <p>Good effort though, you managed to guess <span style={{color: 'lightgreen', fontSize: '1.25rem'}}>{score}</span> of the total <span style={{color: 'lightblue', fontSize: '1.25rem'}}>250</span> countries and territories.</p><br></br>
                    <p>Have a look below the map to see an overview of what you missed ...</p>
                    <button className="btn btn-time-up" onClick={() => {document.querySelector(".time-up-overlay").style.display = 'none'}}>close</button>
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
                    <p>Amazing, you managed to get all the countries and territories: <span style={{color: 'lightgreen', fontSize: '1.25rem'}}>{score}</span> out of  <span style={{color: 'lightblue', fontSize: '1.25rem'}}>250</span>.</p><br></br>
                    <p>Consider yourself a true Geograpeeps Master!</p>
                    <button className="btn btn-time-up" onClick={() => {document.querySelector(".winner-overlay").style.display = 'none'}}>close</button>
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