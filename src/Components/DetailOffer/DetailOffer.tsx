import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {getOfferId} from '../../Redux/Reducer/reducer';

const DetailOffer = () => {

  

  const offerId = useSelector((state:any) => state.workService.offerById);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferId());
  }, [dispatch])


  return (
    <div>
      <div>
        <p>info Client</p>
        <img src={offerId.photoClient} alt="fotito" />
        <p>{offerId.name}</p>
        <p>Rating {offerId.rating}</p>
      </div>
      <div>
        <div><h2>info Offer</h2></div>
        <h2>{offerId.title}</h2>
        <p>{`Paga estimada ARS: ${offerId.remuneration?.slice(0, 1)} - ${offerId.remuneration?.slice(1)}`}</p>
        <p>{`Tiempo estimado del trabajo: ${offerId.work_duration_time}`}</p>
        <p>{offerId.description}</p>
        <img src={offerId.photo} alt="fotito offer"/>
        <p>{offerId.tags?.join(', ')}</p>
      </div>
      <div>
        <div><h2>info Proposals</h2></div>
        <div>{offerId.proposals?.map((e:any)=>{
          return (
            <div>
              <p>{e.name}</p>
              <p>{`Presupuesto ARS: ${e.remunerationProposal}`}</p>
              <p>{e.proposal_description}</p>
              <p>{`Tiempo estimado de entrega: ${e.worked_time}`}</p>
            </div>
          )
        })}</div>
      </div>
    </div>

  )
}

export default DetailOffer