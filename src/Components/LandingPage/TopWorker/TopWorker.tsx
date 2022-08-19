import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../../images/sujeto2.png';
import "./TopWorker.css"

function TopWorker() {
  return (
    <div className='TopWorker_component'>
      <div className='TopWorker_divImage'>
        <img className='TopWorker_hero' src={hero} alt="hero" />
      </div>
      <div className='TopWorker_divDerecha'>
        <h1 className='TopWorker_h1'>Encontrá las mejores <span className='Top_necesidad'>oportunidades</span> para <br/>tus <span className='h1_profesionales'>habilidades</span></h1>
  
        <p className='TopWorker_pageDescription'>Busca el proyecto perfecto para vos <br /> y enviale tu propuesta</p>
      </div>
    </div>
  )
}

export default TopWorker