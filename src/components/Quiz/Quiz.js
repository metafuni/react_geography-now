import React from 'react';
import CountryImg from './CountryImg';

import Input from './Input';

const Quiz = () => {
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
            <Input />
            {/* <CountryImg /> */}
        </div>
    )
}

export default Quiz;