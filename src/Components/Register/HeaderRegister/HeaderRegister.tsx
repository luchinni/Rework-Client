import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../images/logo_header.png"
import './HeaderRegister.css'


const HeaderRegister = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <div className='header_register'>
      <Link to="/home" className='logo'>
        <img src={logo} className="logo_img" alt="" />
      </Link>
          <button className='btn_volver' onClick={handleClick}>Volver</button>
    </div>
  )
}

export default HeaderRegister
