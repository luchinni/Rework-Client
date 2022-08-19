import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './HeaderRegister.css'


const HeaderRegister = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  return (
    <div className='header_register'>
      <Link to="/home" className='logo'>
        RE
        <span className='work'>work</span>
      </Link>
          <button className='btn_volver' onClick={handleClick}>Volver</button>
    </div>
  )
}

export default HeaderRegister