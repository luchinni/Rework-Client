import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import { getUserById } from '../../Redux/Reducer/reducer';
import {resetSearch} from "../../Redux/Reducer/reducer"
import "./Header.css";
import { useDispatch, useSelector } from 'react-redux';
import User from './User/User';
import premiumImage from "../../images/logo_header_premium.png"
import jwtDecode from "jwt-decode"
import Login from '../Login/Login';
import Notification from './Notification/Notification';
import logo from '../../images/logo_header.png';
import menu from '../../images/header_menu.svg';

  const Header = () => {

  const dispatch = useDispatch();

  const reset = () =>{
    dispatch(resetSearch());
  }
  const token:any = localStorage.getItem("token")

  let tokenDecode:any
  if (token) tokenDecode= jwtDecode(token)
  const currentUser = useSelector((state: any) => state.workService.currentUser)
  const userLogged = useSelector((state: any) => state.workService.userLogged)

  useEffect(() => {
    dispatch(getUserById(tokenDecode))
  },[])


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

  const [menuGest, setMenuGest] = useState(false)

  function handleMenu() {
    setMenuGest(!menuGest)
  }

  return (
    <header className='Header_component' id="Header">
      <div className='Header_divContent'>
        {/* <Link to="/home" className='logo'>RE<span onClick={()=>reset()} className='work'>work</span></Link> */}
        <Link to="/home" className='logo'>{currentUser.isPremium?<img className='logo_img_premium' src={premiumImage} alt="REwork" />:<img className='logo_img' src={logo} alt="REwork" />}</Link>
        <nav className='nav'>
          <SearchBar/>
          <div>
            {
              currentUser?.id !== '' && userLogged?.name !== '' ?
              <div className='Header_divButtonsUser'>
                <Notification />
                <User/>
              </div>
              :
              <div>
                <div className='Header_divMenu'>
                  <button className='Header_buttonMenu' onClick={handleMenu}>
                    <img className='Header_menu' src={menu} alt="menu" />
                  </button>
                </div>

                <div>
                  <div>
                    {
                      menuGest &&

                      <div className='Header_divContButtonsMenu'>
                        <div className='div_buttons'>
                          <div>
                            <button onClick={handleOpen} className='button_login'>Inicia sesión</button>
                          </div>
                          <div>
                            <Link to='/register'><button className='button_register'>Regístrate</button></Link>
                          </div>
                        </div>
                      </div>

                    }
                  </div>

                  <div className='div_buttonsOther'>
                    <div>
                      <button onClick={handleOpen} className='button_login'>Inicia sesión</button>
                    </div>
                    <div>
                      <Link to='/register'><button className='button_register'>Regístrate</button></Link>
                    </div>
                  </div>

                </div>


              </div>
            }
          </div>
        </nav>
      </div>
      {openModal &&
        <div className='Header_ModalAbiertoBackground'></div>
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