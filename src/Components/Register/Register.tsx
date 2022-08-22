import React from 'react'
import { Link } from 'react-router-dom';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import './Register.css'
import imageClient from "../../images/Online report_Isometric (1).png"
import imageWorker from "../../images/Money_motivation _Flatline.png"

const Register = () => {
  console.log("pase por register")
  return (
    <div className='Register_container'>
        <HeaderRegister/>
        <div className='Register_welcome'>
          <h3 className='Tegister_welcomeTitle'>¡Te damos la bienvenida a <span className='Register_RE'>RE</span><span className='Register_work'>work</span>!</h3>
          <p className='Register_login'>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
        <div className='Register_divclientWorker'>
          <div className='Register_Worker'>
            <p className='Register_orTitle'>Regístrate como <span className='Register_orTitleOrange'>FreeLancer</span></p>
            <p className='Register_PortOrPublic'>Edita tu portfolio</p>
            <p className='Register_OrDescript'>Aplica a los mejores trabajos para ti</p>
            <br/>
            <div className='Register_divImage'>
              <img src={imageWorker} alt='Register'/>
            </div>
            <Link className='Register_button' to="/register/worker" >Regístrate</Link>        
          </div>
            <div className='Register_Client'>
              <p className='Register_orTitle'>Regístrate como <span className='Register_orTitleAqua'>Cliente</span></p>
              <p className='Register_PortOrPublic'>Realiza publicaciones</p>
              <p className='Register_OrDescript'>Recibe las mejores propuestas</p>
              <p className='Register_OrDescript'>para tus proyectos</p>
              <div className='Register_divImage'>
                <img src={imageClient} alt='Register'/>
              </div>
              <Link className='Register_button' to="/register/client">Regístrate</Link>
            </div>
        </div>
      </div>
  )
}

export default Register