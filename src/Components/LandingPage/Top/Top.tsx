import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../../images/hero.png';
import "./Top.css"
import newTab from "../../../images/openNewTab.png"

function Top() {
  return (
    <div className='Top_component'>
      <div className='Top_divIzquierda'>
        <h1 className='Top_h1'>Conectamos tu <span className='h1_nececidad'>necesidad</span> con los mejores <span className='h1_profesionales'>profesionales</span></h1>
        <p className='Top_pageDescription'>Publica un proyecto y comienza a recibir propuestas <br /> Aplica a los proyectos que mejor se adapten a tus habilidades</p>
        <Link to="/home" className='Top_buttonAcceder'>Prueba la APP<img className='new_tabIcon' src={newTab} alt="" /></Link>
      </div>
      <div className='Top_divImage'>
        <img src={hero} alt="hero" />
      </div>
    </div>
  )
}

export default Top