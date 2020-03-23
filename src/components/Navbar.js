import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/home"><img src={Logo} alt="Geography Now logo" /></Link>
            <ul>
                <li><Link to="/explorer">Explorer</Link></li>
                <li><Link to="/quiz">Quiz</Link></li>
                <li><Link to="/geomap">GeoMap</Link></li>
                <li><Link to="/info">Info</Link></li>
                <li><a href="https://www.youtube.com/user/GeographyNow" target="blank"><i class="fab fa-youtube"></i></a></li>
            </ul>
        </div>
    )
}

export default Navbar;
