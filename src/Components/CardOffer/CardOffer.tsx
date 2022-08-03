import React from 'react'
import './CardOffer.css';

const CardOffer = () => {
  return (
    <div>
      <div>
        <span>info client</span>
        <img className='image' src="" alt="Foto usuario" />
        <div>
          <span>Name</span>
          <span>valoracion</span>
        </div>
      </div>
      <div>
        <span>info offer</span>
        <span>titulo</span>
        <span>price</span>
        <p>description</p>
        <span>tags</span>
      </div>
      <button>detail</button>
    </div>
  )
}

export default CardOffer