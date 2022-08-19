import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../../images/hero.png';
import "./TopClient.css"
import newTab from "../../../images/openNewTab.png"

function TopClient() {
  return (
    <div className='Top_component'>
      <div className='Top_divIzquierda'>
        <h1 className='Top_h1'>Conectamos tu <span className='h1_necesidad'>necesidad</span> con los mejores <span className='h1_profesionales'>profesionales</span></h1>
        
        <p className='Top_pageDescription'>Publica un proyecto y comienza a recibir propuestas</p>
      </div>
      <div className='Top_divImage'>
        <img className="Top_hero" src={hero} alt="hero" />
      </div>
    </div>
  )
}

export default TopClient