import React from 'react';
import './Information.css';
import { useSelector } from "react-redux";

function Information({props}:any) {
  const currentUser = useSelector(
    (state: any) => state.workService.currentUser
  );

  console.log("information", props)
  return (
    <div className='Information_Component'>
      <div className='Information'>
        <h2 className='Information_title'>Información</h2>
        
       { props?.isWorker === true ?
       <div>
         <h3 className='UserProfessions'>Profesiones:<span> {props?.profession?.join(", ")}</span></h3>
          <h3 className='UserHabilities'>Habilidades:<span> {props?.skills?.join(", ")}</span></h3>
       </div>
      : false }
        
        <div className="UserDescription">
          {props.description ? <p><span>Descripción: </span>{props.description}</p>
          : props.id !== currentUser.id ? <p><span>Descripción: </span>El usuario no ha cargado una descripción</p>
          : currentUser.isWorker === true ? <p><span>Descripción: </span>Carga una descripción para que los clientes puedan conocerte mejor</p>
          : <p><span>Descripción: </span>Carga una descripción para que los trabajadores puedan conocerte mejor</p>}
          {/* <p>Diseñadora gráfica con tres años de experiencia en agencias de publicidad. 
          Especializada en ilustración digital en 2D para redes sociales. 
          Coordinadora de la campaña de diseño para la marca PediaFun, la cual elevó los índices de engagement en Facebook e Instagram en un 25%. 
          En busca de utilizar mis conocimientos de diseño digital y social media para alcanzar los objetivos del área de diseño de Andares Corp.
          </p> */}
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
