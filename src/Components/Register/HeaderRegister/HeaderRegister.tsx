import React from 'react'
import { Link } from 'react-router-dom';
import './HeaderRegister.css'

const HeaderRegister = () => {
  return (
    <div className='header_register'>
          <Link to="/home" className="logo_register">logo</Link>
          <Link to='/' ><button className='btn_volver'>Volver</button></Link>
    </div>
  )
}

export default HeaderRegister