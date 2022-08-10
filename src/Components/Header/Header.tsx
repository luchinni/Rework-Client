import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import {resetSearch} from "../../Redux/Reducer/reducer"
import "./Header.css";
import { useDispatch } from 'react-redux';
import User from './User/User';
import Login from '../Login/Login';

const Header = () => {
  const token = localStorage.getItem("token")

  const dispatch = useDispatch();

  const reset = () =>{
    dispatch(resetSearch());
  }

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 25) {
      document.querySelector("#Header")?.classList.add("scroll")
    } else {
      document.querySelector("#Header")?.classList.remove("scroll")
    }
  }

  const [openModal, setOpenModal] = useState(false);

  function handleOpen() {
    setOpenModal(true)
  }

  function handleClose(value:any) {
    setOpenModal(value)
  }

  return (
    <header className='Header_component' id="Header">
      <div className='Header_divContent'>
        <Link to="/home" className='logo'>RE<span onClick={()=>reset()} className='work'>work</span></Link>      
        <nav className='nav'>
          <SearchBar/>
          <div>

          { token ? 
          <User/>
          :


          <div className='div_buttons'>
            <div>
              <button onClick={handleOpen} className='button_login'>Inicia sesión</button>
            </div>
            <div>
              <Link to='/register'><button className='button_register'>Registrate</button></Link>
            </div>
          </div>
          }
          </div>
        </nav>
      </div>
      {openModal && 
        <div className='Header_ModalAbiertoBackground'>
          
        </div>
      }
      {openModal && 
        <div className='Header_ModalLogin'>
          <Login close={handleClose} />
        </div>
      }
    </header>
  )
}

export default Header