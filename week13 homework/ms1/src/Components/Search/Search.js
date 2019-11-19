import React from 'react';
import './Search.css';
import logo from '../Header/logo.png';

const Search = (props) => {
    return(
        <div className="Search">
            <img id="LogoCenter" src={logo} alt="logo"/>
            <input id="main-search-bar" type="text" placeholder=""></input>
            
        </div>
    );
}



export default Search;