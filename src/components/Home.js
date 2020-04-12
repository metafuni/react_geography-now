import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../img/logo.png';
import Banner from '../img/banner.png';

import ExplorerImg from '../img/svg/explorer.svg';
import QuizImg from '../img/svg/quiz.svg';
import GeoMapImg from '../img/svg/geomap.svg';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home">
                <div className="overlay">
                    <div className="header">
                        <img src={Logo} alt="Geography Now Logo" />
                        <h1>Geography Now!</h1>
                        <span className="elearn">
                            <span className="e">
                                e <i className="fas fa-graduation-cap"></i>
                            </span>
                            learn
                        </span>
                    </div>
                    <div className="header-paragraph">
                        <p>Let's explore the world together</p>
                        <NavLink to="/explorer" className="btn btn-header"><i className="far fa-caret-square-right"></i> start</NavLink>
                    </div>
                </div>
            </div>

            <div className="info">
                <div className="cardi card-l">
                    <div className="img-box img-l">
                        <img src={ExplorerImg} alt="Geography Now! Explorer" />
                    </div>
                    <h2>Explorer</h2>
                    <p>
                        Get to know our beautiful planet earth by looking up all your favourite countries, and learn about them!
                    </p><br></br>
                    <NavLink to="/explorer" className="btn btn-l">Explore</NavLink>
                </div>
                <div className="cardi card-m">
                    <div className="img-box img-r">
                        <img src={GeoMapImg} alt="Geography Now! GeoMap" />
                    </div>
                    <h2>GeoMap</h2>
                    <p>
                        Explore all the Geography Now! videos with the GeoMap and improve your all-round and geographical knowledge.
                    </p><br></br>
                    <NavLink to="/geomap" className="btn btn-r">GeoMap now!</NavLink>
                </div>
                <div className="cardi card-r">
                    <div className="img-box img-m">
                        <img src={QuizImg} alt="Geography Now! Quiz" />
                    </div>
                    <h2>Quiz</h2>
                    <p>
                        You think your geographicational knowledge is up to date now?<br></br> Well... let's see if you can pass the <span style={{ textTransform: 'italic' }}>Geography Now!</span> quiz.
                    </p><br></br>
                    <NavLink to="/quiz" className="btn btn-m">take the Quiz</NavLink>
                </div>
            </div>

            <div className="video-container">
                <iframe 
                    width="790" 
                    height="460" 
                    title="Geography Now! reached 2 Million subscribers Youtube video"
                    src="https://www.youtube.com/embed/_GyOH5_b4Xg?modestbranding=1;controls=0;showinfo=0;rel=0;fs=1" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>

            <a href="https://www.youtube.com/user/GeographyNow" target="blank" title="Geography Now Youtube Channel">
                <img src={Banner} alt="Geography Now Youtube Channel" className="banner-img" />
            </a>
        </div>
    )
}

export default Home;