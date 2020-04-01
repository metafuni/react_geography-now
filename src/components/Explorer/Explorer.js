import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import Search from './Search';
import Card from './Card';

const Explorer = () => {

    const [country, setCountry] = useState({});
    const [loading, setLoading] = useState(false);

    const updateCountry = (data) => {
        setLoading(true);
        setCountry(data);
    };

    useEffect(() => {
        setLoading(false);
    });

    return (
        <div className="Explorer">
            <Search updateCountry={updateCountry} />
            <Card country={country} />
        </div>
    )
}

export default Explorer;