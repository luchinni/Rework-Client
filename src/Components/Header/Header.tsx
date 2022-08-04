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
            <button className='button_login'>Log in</button>
            <button className='button_register'>Sing up</button>
          </div>
        </nav>
    </div>
  )
}

export default Header