import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {checkSession, getOfferId, getOfferForHistory} from '../../../../Redux/Reducer/reducer';
import {GiArchiveResearch} from "react-icons/gi"
import "./HistorialCard.css"
import { Link, useNavigate } from 'react-router-dom';

const HistorialCard = ({props}:any) => {

    const dispatch = useDispatch();
    const offerId = useSelector((state:any) => state.workService.offerById);
    const [currentOffer, setCurrentOffer] = useState<any>({})
    const navigate = useNavigate();

    useEffect(() => {
        getOfferForHistory(props.offerIdOffer)
        .then((response)=>{
            setCurrentOffer(response)
        })
        dispatch(checkSession())
      }, [dispatch])
  return (
    <div className='Historial-contenedor'>
        <p>Realizaste una propuesta de trabajo a la oferta: <b>{currentOffer.userClient?.name}</b><GiArchiveResearch onClick={()=>navigate(`/detailOffer/${props.offerId}`)}/></p>
        <p>Descripción: <b>{props.proposal_description}</b></p>
        <p>Ofreciste: <b>ARS$ {props.remuneration}</b> y terminar el trabajo en: <b>{props.worked_time}</b></p>
        <p>El estado de tu propuesta es: <b>{props.state}</b></p>
        {props.state === "accepted"?<p>Tu propuesta fue aceptada, revisa tu casilla de correo para firmar el contrato de trabajo</p>:<></>}
    </div>
  )
}

export default HistorialCard