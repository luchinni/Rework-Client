import React from 'react'
import SearchBar from './SearchBar/SearchBar';
import "./Header.css";

const Header = () => {
  return (
    <div className="divNav">
        <nav className='nav'>
          <span className="logo">logo</span>
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