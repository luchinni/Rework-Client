import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Pending.css"

const Pending = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home")
}
  return (
    <div>
      <div className='pending_display'>
        <h1>¡Tu pago esta pendiente!</h1>
        <h2>Estamos teniendo problemas para procesar tu pago</h2>
        <h3>Estamos intentando procesar tu pago, esto puede demorar te enviaremos un mail con el resultado.</h3>
        <button className='Detail_premiumButton' onClick={goHome}>Volver al sitio</button>
      </div>
    </div>
  )
}

export default Pending