import React from 'react'
import './CardPortfolio.css'

function CardPorfolio(props:any) {

  const handleClose = () => {
    props.close(false)
}

  return (
    <div className='CardPortfolio_component'>
      <button className='CardPortfolio_button' onClick={handleClose}>x</button>
      <div className='CardPortfolio_divContent'>
        <div>
          <img src={props.portfolio.photo} alt="imagen" />
        </div>
        <div>
          <div className='CardPortfolio_title'>
            <span>{props.portfolio.title}</span>
          </div>
          <div className='CardPortfolio_description'>
            <p>{props.portfolio.portfolio_description}</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default CardPorfolio