import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {checkSession, getOfferId, getOfferForHistory} from '../../../../Redux/Reducer/reducer';
import "./HistorialCard.css"
import { useNavigate } from 'react-router-dom';

const HistorialCard = ({props}:any) => {

    const dispatch = useDispatch();
    const offerId = useSelector((state:any) => state.workService.offerById);
    const [currentOffer, setCurrentOffer] = useState<any>({})
    const navigate = useNavigate();

    const translateState = (state: string) => {
      if (state === "active" || state === "posted") return "activa";
      if (state === "cancelled") return "cancelada";
      if (state === "rejected") return "rechazada";
      if (state === "contract rejected") return "contrato rechazado";
      if (state === "contract cancelled") return "contrato cancelado";
      if (state === "contract started") return "contrato comenzado";
      if (state === "contract accepted") return "contrato aceptado";
      if (state === "finalized") return "finalizada";
      if (state === "released payment") return "pago liberado";
      if (state === "accepted") return "aceptada";
    };

    useEffect(() => {
      if(!props?.hasOwnProperty("profession")){
        getOfferForHistory(props.offerIdOffer)
        .then((response)=>{
          setCurrentOffer(response)
        })
      }
        dispatch(checkSession())
      }, [dispatch]);
      
  return (
    <div className='Historial-contenedor'>
      {props?.hasOwnProperty("idOffer") ?
        <div className='Historial-offer' onClick={()=>navigate(`/detailOffer/${props.idOffer}`)}>
          <span className='Historial-p-title'><b>Postulaste la oferta: </b> {props.title}</span>
          <span className='Historial-p-state'><b>Estado: </b> {translateState(props.state)}</span>
          <p><b>Descripción: </b> {props.offer_description.length > 0 ? props.offer_description.slice(0,98).concat("...") : props.offer_description}</p>
          <span><b>Rango de remuneración: </b>ARS$ {props.min_remuneration} y {props.max_remuneration}</span> 
          <span className='Historial-p-state'><b>Duración de: </b>{props.work_duration_time}</span>
          {/* props.state === "contract started" ? <p>Tu oferta recibió una propuesta aceptada, <br/>revisa tu casilla de correo para firmar el contrato de trabajo</p> : <></> */}
        </div>
      : (props?.hasOwnProperty("idProposal") ?
        <div className='Historial-offer' onClick={()=>navigate(`/detailOffer/${props.offerIdOffer}`)}>
          <span className='Historial-p-title'><b>Te postulaste a la oferta: </b> {currentOffer.title} <b> de </b> {currentOffer.userClient?.name} {currentOffer.userClient?.lastName}</span>
          <span className='Historial-p-state'><b>Estado: </b>{translateState(props.state)}</span>
          <p><b>Descripción: </b> {props.proposal_description.length > 98 ? props.proposal_description.slice(0,98).concat("...") : props.proposal_description}</p>
          <span><b>Ofreciste: </b>ARS$ {props.remuneration}</span>
          <span className='Historial-p-state'><b>Duración de: </b> {props.worked_time}</span>
          {/* props.state === "accepted" ? <p>Tu propuesta fue aceptada, revisa tu casilla de correo para firmar el contrato de trabajo</p> : <></> */}
        </div>
       : <div/>)}
    </div>
  )
}

export default HistorialCard
