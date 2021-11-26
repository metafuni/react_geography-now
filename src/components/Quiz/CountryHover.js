import React, { useEffect } from 'react';


const CountryHover = ({ stop, playing, countries, answers }) => {

    const countryHoverBox = document.querySelector('.country-hover-box');
    const countryHoverImg = document.getElementById('country-hover-img');
    const countryHoverText = document.getElementById('country-hover-text');
    const allPaths = document.querySelectorAll('path');

    useEffect(() => {
        if (stop) {
            allPaths.forEach((e) => {
                e.addEventListener("mouseover", (x) => {
                    countryHoverBox.style.display = 'flex';
                    const cursor = (e) => {
                        if (e.pageX/window.innerWidth <= 0.9) {
                            countryHoverBox.style.top = e.pageY - 25 + 'px';
                            countryHoverBox.style.left = e.pageX + 8 + 'px';
                            countryHoverBox.style.transform = 'translateX(0)';
                        } if (e.pageX/window.innerWidth > 0.9) {
                            countryHoverBox.style.top = e.pageY - 25 + 'px';
                            countryHoverBox.style.left = e.pageX - 5 + 'px';
                            countryHoverBox.style.transform = 'translateX(-100%)';
                        };
                    };
                    window.addEventListener('mousemove', cursor);

                    if (x.target.id.length === 2) {
                        e.setAttribute("style", "stroke: black; opacity: .3");
                        for (let i = 0; i < countries.length; i++) {
                            if (countries[i].id === x.target.id.toUpperCase() && x.target.id !== "ss") {
                                countryHoverImg.src = countries[i].flag;
                                countryHoverText.innerText = countries[i].name[0];
                            };
                            if (x.target.id === "ss") {
                                countryHoverImg.src = "https://restcountries.com/data/ata.svg";
                                countryHoverText.innerText = "Antarctica";
                            };
                        };
                        for (let j = 0; j < answers.length; j++) {
                            if (answers[j].id === x.target.id.toUpperCase()) {
                                countryHoverImg.src = answers[j].flag;
                                countryHoverText.innerText = answers[j].name[0];
                            };
                        };
                    } else if (x.target.parentNode.id.length === 2) {
                        const paths = e.parentElement.querySelectorAll('path');
                        for (let i = 0; i < countries.length; i++) {
                            if (countries[i].id === x.target.parentNode.id.toUpperCase()) {
                                countryHoverImg.src = countries[i].flag;
                                countryHoverText.innerText = countries[i].name[0];
                            };
                        };
                        for (let j = 0; j < answers.length; j++) {
                            if (answers[j].id === x.target.parentNode.id.toUpperCase()) {
                                countryHoverImg.src = answers[j].flag;
                                countryHoverText.innerText = answers[j].name[0];
                            };
                        };
                        for (let i = 0; i < paths.length; i++) {
                            paths[i].setAttribute("style", "stroke: black; opacity: .3");
                        };
                    } else if (x.target.parentNode.parentNode.id.length === 2) {
                        const paths = e.parentElement.parentElement.querySelectorAll('path');
                        for (let i = 0; i < countries.length; i++) {
                            if (countries[i].id === x.target.parentNode.parentNode.id.toUpperCase()) {
                                countryHoverImg.src = countries[i].flag;
                                countryHoverText.innerText = countries[i].name[0];
                            };
                        };
                        for (let j = 0; j < answers.length; j++) {
                            if (answers[j].id === x.target.parentNode.parentNode.id.toUpperCase()) {
                                countryHoverImg.src = answers[j].flag;
                                countryHoverText.innerText = answers[j].name[0];
                            };
                        };
                        for (let i = 0; i < paths.length; i++) {
                            paths[i].setAttribute("style", "stroke: black; opacity: .3");
                        };
                    } else if (x.target.parentNode.parentNode.parentNode.id.length === 2) {
                        const paths = e.parentElement.parentElement.parentElement.querySelectorAll('path');
                        for (let i = 0; i < countries.length; i++) {
                            if (countries[i].id === x.target.parentNode.parentNode.parentNode.id.toUpperCase()) {
                                countryHoverImg.src = countries[i].flag;
                                countryHoverText.innerText = countries[i].name[0];
                            };
                        };
                        for (let j = 0; j < answers.length; j++) {
                            if (answers[j].id === x.target.parentNode.parentNode.parentNode.id.toUpperCase()) {
                                countryHoverImg.src = answers[j].flag;
                                countryHoverText.innerText = answers[j].name[0];
                            };
                        };
                        for (let i = 0; i < paths.length; i++) {
                            paths[i].setAttribute("style", "stroke: black; opacity: .3");
                        };
                    };
                });
            });
            allPaths.forEach((e) => {
                e.addEventListener("mouseout", (x) => {
                    countryHoverBox.style.display = 'none';
                    if (x.target.id.length === 2) {
                        e.setAttribute("style", "stroke: white");
                    } else if (x.target.parentNode.id.length === 2) {
                        const paths = e.parentElement.querySelectorAll('path');
                        for (let i = 0; i < paths.length; i++) {
                            paths[i].setAttribute("style", "stroke: white");
                        };
                    } else if (x.target.parentNode.parentNode.id.length === 2) {
                        const paths = e.parentElement.parentElement.querySelectorAll('path');
                        for (let i = 0; i < paths.length; i++) {
                            paths[i].setAttribute("style", "stroke: white");
                        };
                    } else if (x.target.parentNode.parentNode.parentNode.id.length === 2) {
                        const paths = e.parentElement.parentElement.parentElement.querySelectorAll('path');
                        for (let i = 0; i < paths.length; i++) {
                            paths[i].setAttribute("style", "stroke: white");
                        };
                    };
                });
            });
        };
    }, [stop]);

    return (
        <>
        </>
    )
};

export default CountryHover;