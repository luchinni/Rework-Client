import React from 'react'
import { Link } from 'react-router-dom';
import HeaderRegister from './HeaderRegister/HeaderRegister';
import './Register.css'

const Register = () => {
  return (
    <div className='contenedor_register'>
        <HeaderRegister/>
        <div className='contenedor_divs_trab_client'>
          <div className='div_trabajador'>
            <p>Registrate como FreeLancer</p>
            <p>Edita tu portfolio</p>
            <p>Aplica a los mejores</p>
            <p>trabajos para ti</p>
            <img src='' alt='acá va una imagen'/>
            <Link to="/register/worker" ><button>FreeLancer</button></Link>        
          </div>
            <div className='div_client'>
              <span>Registrate como Cliente</span>
              <p>Realiza publicaciones<br/>
                                      <br/>
                 Recibe las mejores ofertas
                 para tu trabajo</p>
              <img src='' alt='acá va una imagen'/>
              <Link to="/register/client" ><button>Cliente</button></Link>
            </div>
        </div>

    </div>
  )
}

export default Register