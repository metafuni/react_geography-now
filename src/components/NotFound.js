import React from 'react';

const NotFound = () => {
    return (
        <div className="notfound">
            <div className="overlay" style={{ padding: '5rem 0', margin: '5rem auto'}}>
                <h1 style={{textAlign: 'center'}}>404</h1>
                <h3 style={{textAlign: 'center'}}>Page not found</h3>
            </div>
        </div>
    )
}

export default NotFound;