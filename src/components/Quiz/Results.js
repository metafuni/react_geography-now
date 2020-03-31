import React from 'react';

const Results = () => {
    return (
        <div className="results">
            <div className="results-top">
    <div className="result-box americas"><h3>Americas</h3></div>
                <div className="result-box europe"><h3>Europe</h3></div>
                <div className="result-box africa"><h3>Africa</h3></div>
            </div>
            <div className="results-bottom">
                <div className="result-box asia"><h3>Asia</h3></div>
                <div className="result-box oceania"><h3>Oceania</h3></div>
                <div className="result-box polar"><h3>Polar</h3></div>
            </div>
        </div>
    )
}

export default Results;
