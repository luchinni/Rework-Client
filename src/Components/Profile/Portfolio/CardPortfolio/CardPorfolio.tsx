import React from 'react'
import './CardPortfolio.css'

function CardPorfolio() {
  return (
    <div className='CardPortfolio_component'>
      <div className='CardPortfolio_divContent'>

        <div>
          <img src="https://th.bing.com/th/id/OIP.VlznYjH4Qqw0N5XSmNzWJwHaFj?pid=ImgDet&rs=1" alt="imagen" />
        </div>

        <div>
          <div>
            <span>titulo</span>
          </div>
          <div>
            <p>descripcion</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default CardPorfolio