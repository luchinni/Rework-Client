import React, {useEffect, useState} from 'react';
import {checkSession, getOfferId} from '../../../Redux/Reducer/reducer';
import { useSelector, useDispatch } from 'react-redux';
import './Historial.css'
import HistorialCard from './HistorialCards/HistorialCard';

function Historial() {

  const userLogged = useSelector((state: any) => state.workService.userLogged)
  const offerId = useSelector((state:any) => state.workService.offerById);
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getOfferId(props.offerIdOffer));
    //dispatch(checkSession())
  }, [dispatch])

  return (
    <div className='Historial_Component'>
      {userLogged.isWorker===true?(
        <div className='Historial_divContent'>
        <h2>Historial</h2>
        <div className='Historial_divHistorial'>
          <div className='Historial_historial'>
            {
              userLogged.proposals.length>0?
              userLogged.proposals?.map((e:any) => {
                return <HistorialCard props={e}/>
              })
              :
              <p>Aun no hay datos que mostrar</p>
            }
            {/* <p>viste el perfil de: <b>Debora meltorozo</b></p> */}
          </div>
        </div>
      </div>
      ):
      <div className='Historial_divContent'>
        <h2>Historial</h2>
        <div className='Historial_divHistorial'>
          <div className='Historial_historial'>
            <p>viste el perfil de: <b>Debora meltorozo</b></p>
          </div>
          <div className='Historial_historial'>
            <p>viste el perfil de: <b>Analiza melchoto</b></p>
          </div>
        </div>
      </div>}
      
    </div>
  )
}

export default Historial