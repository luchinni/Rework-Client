import React from 'react'
import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {
  return (
    <div className='contenedor_register'>
        <div className='header'>
          <Link to="/home" className="logo">logo</Link>
          <Link to='/' ><button className='btn_volver'>Volver</button></Link>
        </div>
        <div className='contenedor_divs_trab_client'>
            <div className='div_trabajador'>
              <span>Registrate como Free Lancer</span><br/>
              <p>Edita tu portfolio<br/>
                                   <br/>
                 Aplica a los mejores 
                 trabajos para ti</p>
              <img src='' alt='acá va una imagen'/>
              <Link to="/register/worker" ><button>Worker</button></Link>        
            </div>
            <div className='div_client'>
              <span>Registrate como Cliente</span>
              <p>Realiza publicaciones<br/>
                                      <br/>
                 Recibe las mejores ofertas
                 para tu trabajo</p>
              <img src='' alt='acá va una imagen'/>
              <Link to="/register/client" ><button>Client</button></Link>
            </div>
        </div>

    </div>
  )
}

export default Register