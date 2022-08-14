import React from 'react'
import './Historial.css'

function Historial() {
  return (
    <div className='Historial_Component'>
      <div className='Historial_divContent'>
        Historial
        <div className='Historial_divHistorial'>
          <div className='Historial_historial'>
            <p>viste el perfil de: <b>Debora meltorozo</b></p>
          </div>
          <div className='Historial_historial'>
            <p>viste el perfil de: <b>Analiza melchoto</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Historial