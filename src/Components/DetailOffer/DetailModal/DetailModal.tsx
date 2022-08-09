import React from 'react'
import './DetailModal.css'

function DetailModal() {
  return (
    <div className='DetailModal_component'>
      <div className='DetailModal_divContent'>
        <p className='DetailModal_title'>Envia tu propuesta</p>
        <form action="">
          <div className='DetailModal_contentInputs'>
            <div className='DetailModal_divInputs'>
              <label>Tu presupuesto</label>
              <input type="number" placeholder='Ej: 1500$'/>
            </div>
            <div className='DetailModal_divInputs'>
              <label>Dias de trabajo</label>
              <input type="number" placeholder='Ej: 7'/>
            </div>
          </div>
          <div className='DetailModal_divInputs'>
            <label>Descripcion</label>
            <input type="number" placeholder='Ej: y como es el? en que lugar se enamoro de ti?'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DetailModal