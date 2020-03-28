import React from 'react';

const Input = ({ checkAnswer }) => {
    return (
        <div className="input">
            <form onChange={checkAnswer} onSubmit={checkAnswer}>
                <input placeholder="Enter country..."></input>
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
                    <p>Enter your answers in the <span style={{ fontStyle: 'italic', color: '#5757579d' }}>"Enter country... "</span> input-field, whether it's in English or your own language. <br></br><br></br>
                        The input field is case insensitive, so lowercase or uppercase does not matter. <br></br><br></br>
                        There is no specific order, just try to guess all the countries in the world within the time limit. Good luck!
                    </p>
                </div>
                <button className="btn btn-pause"><i className="fas fa-pause"></i></button>
                <button className="btn btn-stop"><i className="fas fa-stop"></i></button>
            </div>
            <div className="start-button">
                <button className="btn btn-start"><i className="fas fa-play"></i></button>
            </div>
            <div className="quiz-timer">
                15:00
            </div>
        </div>
    )
}

export default Input;