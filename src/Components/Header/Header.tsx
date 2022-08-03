import React from 'react'
import SearchBar from './SearchBar/SearchBar';
import "./Header.css";

const Header = () => {
  return (
    <div className="divNav">
        <span className="logo">LOGO</span>
        <nav className='nav'>
          <SearchBar/>
          <div>
            <button>login</button>
            <button>register</button>
          </div>
        </nav>
    </div>
  )
}

export default Header