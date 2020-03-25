import React from 'react';
import Logo from '../img/logo.png';

const Footer = () => (
    <div className="footer">
        <div className="social-icons">
            <a href="https://www.facebook.com/GeographyNowFanpage/" alt="Geography Now! Facebook page" target="blank"><i className="fab fa-facebook fa-2x"></i></a>
            <a href="https://twitter.com/GeographyNow" alt="Geography Now! Twitter page" target="blank"><i className="fab fa-twitter fa-2x"></i></a>
            <a href="https://www.instagram.com/geographynow_official/" alt="Geography Now! Instagram" target="blank"><i className="fab fa-instagram fa-2x"></i></a>
            <a href="https://www.youtube.com/user/GeographyNow" alt="Geography Now! Youtube channel" target="blank"><i className="fab fa-youtube fa-2x"></i></a>
        </div>
        <div className="footer-info">
            <img src={Logo} alt="Geography Now logo" />
            <p>&copy;2020, Geography Now</p>
        </div>
        <div className="contact">
            <p>
                Geography Now<br></br><br></br>
                1905 N Wilcox ave<br></br> 
                #432 Los Angeles CA<br></br> 
                90068<br></br><br></br>
                <a href="mailto:hello@geographynow.com?Subject=Hello%20again" target="_top">hello@geographynow.com</a>
            </p>
        </div>
    </div>
);

export default Footer;
