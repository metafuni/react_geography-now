import React, { useState } from 'react';

import Autosuggest from 'react-autosuggest';
import Axios from 'axios';

const Search = ({ updateCountry }) => {

    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    return (
        <div className="search">
            <div className="overlay">
                <h1>
                    <span className="elearn">
                        <span className="e">
                            e <i className="fas fa-graduation-cap"></i>
                        </span>
                        learn
                    </span>
                    Explorer
                </h1>
                <form className="search-form">
                    <Autosuggest
                        inputProps={{
                            placeholder: "Search Country...",
                            autoComplete: "off",
                            name: "country",
                            id: "country",
                            value: searchText,
                            onChange: (e, { newValue }) => {
                                setSearchText(newValue);
                            }
                        }}
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={async ({ value }) => {
                            if (!value) {
                                setSuggestions([]);
                                return;
                            }
                            try {
                                const result = await Axios(`https://restcountries.com/v2/name/${value}`);
                                setSuggestions(result.data);
                            } catch (e) {
                                setSuggestions([]);
                            }
                        }}
                        onSuggestionsClearRequested={() => {
                            setSuggestions([]);
                        }}
                        onSuggestionSelected={(event, { suggestion, method }) => {
                            if (method === 'enter' || method === 'click') {
                                updateCountry(suggestion);
                            }
                            setSearchText(suggestion.name);
                        }}
                        getSuggestionValue={(suggestion) => suggestion.name}
                        renderSuggestion={suggestion => <div>{suggestion.name}</div>}
                    />
                    <button className="x-button" onClick={(e) => { e.preventDefault(); setSearchText('') }}>
                        <i className="fa fa-times fa-2x"></i>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Search;