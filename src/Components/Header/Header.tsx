import React from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import {resetSearch} from "../../Redux/Reducer/reducer"
import "./Header.css";
import { useDispatch } from 'react-redux';
import User from './User/User';

const Header = () => {

  const dispatch = useDispatch();

  const reset = () =>{
    dispatch(resetSearch());
  }

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
      document.querySelector("#Header")?.classList.add("scroll")
    } else {
      document.querySelector("#Header")?.classList.remove("scroll")
    }
  }

  return (
    <header className="Header_component" id="Header">
      <Link to="/home" className='logo'>RE<span onClick={()=>reset()} className='work'>work</span></Link>      
      <nav className='nav'>
        <SearchBar/>

        <User/>

        <div className='div_buttons'>
          <div>
            <Link to='/login'><button className='button_login'>Inicia sesión</button></Link>
          </div>
          <div>
            <Link to='/register'><button className='button_register'>Registrate</button></Link>
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Header