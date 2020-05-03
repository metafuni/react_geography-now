import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../img/logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/"><img src={Logo} alt="Geography Now logo" /></NavLink>
            <ul>
                <li><NavLink to="/explorer" activeStyle={{ color: '#01aaad', opacity: '1' }}>Explorer</NavLink></li>
                <li><NavLink to="/geomap" activeStyle={{ color: '#01aaad', opacity: '1' }}>GeoMap</NavLink></li>
                <li><NavLink to="/quiz" activeStyle={{ color: '#01aaad', opacity: '1' }}>Quiz</NavLink></li>
                <li><a href="https://www.youtube.com/user/GeographyNow" target="blank" title="Geography Now Youtube Channel"><i className="fab fa-youtube fa-2x"></i></a></li>
            </ul>
        </div>
    )
}

export default Navbar;
