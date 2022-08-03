import React from 'react'
import SearchBar from './SearchBar/SearchBar';
import "./Header.css";

const Header = () => {
  return (
    <div className="Header_component">
        <span className="logo">logo</span>
        <nav className='nav'>
          <SearchBar/>
          <div className='div_buttons'>
            <button className='button_login'>login</button>
            <button className='button_register'>register</button>
          </div>
        </nav>
    </div>
  )
}

export default Header