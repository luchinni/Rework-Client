import React from 'react'
import SearchBar from './SearchBar/SearchBar';
import "./Nav.css";

const Nav = () => {
  return (
    <div className="divNav">
        <span className="logo">LOGO</span>
        <SearchBar/>
        <button>log in</button>
        <button>register</button>
    </div>
  )
}

export default Nav