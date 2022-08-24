import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./Failure.css"

const Failure = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home")
}
  return (
    <div>
      <div className='failure_display'>
        <h1>¡Tu pago fue rechazado!</h1>
        <h2>Porfavor revisa tus datos e intentalo de nuevo</h2>
        <h3>Si crees que esto fue un error, porfavor ponte en contacto con el staff de REwork.</h3>
        <button className='Detail_premiumButton' onClick={goHome}>Volver al sitio</button>
      </div>
    </div>
  )
}

export default Failure