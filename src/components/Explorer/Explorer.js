import React, { useState } from 'react';

import Search from './Search';
import Card from './Card';

const Explorer = () => {

    const [country, setCountry] = useState({});

    const updateCountry = (data) => {
        setCountry(data);
    };

    return (
        <div className="Explorer">
            <Search updateCountry={updateCountry} />
            <Card country={country} />
        </div>
    )
}

export default Explorer;