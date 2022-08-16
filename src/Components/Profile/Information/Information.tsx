import React from 'react'
import './Information.css'

function Information({props}:any) {
  return (
    <div className='Information_Component'>
      <div className='Invormation'>
        <h2>Información</h2>
        <h3 className='UserProfessions'>Profesiones: {props?.profession?.join(", ")}</h3>
        <p className='UserHabilities'>Habilidades: {props?.skills?.join(", ")}</p>
        <div className="UserDescription">
          <p>Diseñadora gráfica con tres años de experiencia en agencias de publicidad. 
          Especializada en ilustración digital en 2D para redes sociales. 
          Coordinadora de la campaña de diseño para la marca PediaFun, la cual elevó los índices de engagement en Facebook e Instagram en un 25%. 
          En busca de utilizar mis conocimientos de diseño digital y social media para alcanzar los objetivos del área de diseño de Andares Corp.
          </p>
        </div>
        
        {/* <ul className='Information_ul'>
          <li></li>
          <li></li>
          <li></li>
        </ul> */}
      </div>
    </div>
  )
}

export default Information