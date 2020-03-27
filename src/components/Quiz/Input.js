import React from 'react';

const Input = () => {
    return (
        <div className="input">
            <form>
                <input></input>
            </form>
            <div className="quiz-buttons">
                <button className="btn btn-question"><i className="fas fa-question"></i></button>
                <button className="btn btn-pause"><i className="fas fa-pause"></i></button>
                <button className="btn btn-stop"><i className="fas fa-stop"></i></button>
            </div>
        </div>
    )
}

export default Input;