import React from 'react'
import './DetailModal.css'

function DetailModal(props:any) {

  function handleModalClose() {
    props.close(false)
  }

  function handleSubmit(e:any) {
    e.preventDefault()
  }

  return (
    <div className='DetailModal_component'>
      <div className='DetailModal_divContent'>
        <div>
          <p className='DetailModal_title'>Envia tu propuesta</p>
          <form onSubmit={handleSubmit}>
            <div className='DetailModal_contentInputs'>
              <div className='DetailModal_divInputs'>
                <label className='DetailModal_label'>Tu presupuesto</label>
                <input className='DetailModal_input' placeholder='Ej: 1500$'/>
              </div>
              <div className='DetailModal_divInputs'>
                <label className='DetailModal_label'>Dias de trabajo</label>
                <input className='DetailModal_input' placeholder='Ej: 7'/>
              </div>
            </div>
            <div className='DetailModal_divInputs'>
              <label className='DetailModal_label'>Descripcion</label>
              <input className='DetailModal_input' placeholder='Ej: y como es el? en que lugar se enamoro de ti?'/>
            </div>
            <input className='DetailModal_submit' type="submit" />
          </form>
        </div>
      </div>
        <div>
          <div className='DetailModal_divImage'>
            <div className='DetailModal_divButtonClose'>
              <button className='DetailModal_buttonClose' onClick={handleModalClose}>x</button>
            </div>
            <img className='DetailModal_image' src="https://images.pexels.com/photos/5198243/pexels-photo-5198243.jpeg?cs=srgb&dl=pexels-tima-miroshnichenko-5198243.jpg&fm=jpg" alt="example" />
          </div>
        </div>
    </div>
  )
}

export default DetailModal