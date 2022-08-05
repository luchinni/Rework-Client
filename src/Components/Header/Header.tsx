import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import "./Header.css";

const Header = () => {



  return (
    <header className="Header_component">
      <Link to="/home" className="logo">logo</Link>      
        <nav className='nav'>
          <SearchBar/>
          <div className='div_buttons'>
            <div>
              <button className='button_login'>Log in</button>
            </div>
            <div>
            <Link to='/register'><button className='button_register'>Sing up</button></Link>
            </div>
          </div>
        </nav>
    </header>
  )
}

export default Header