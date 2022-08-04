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
        <p>{offerId.rating}</p>
      </div>
      <div>
        <div><h2>info Offer</h2></div>
        <h2>{offerId.title}</h2>
        <p>{offerId.remuneration}</p>
        <p>{offerId.work_duration_time}</p>
        <p>{offerId.description}</p>
        <img src={offerId.photo} alt="fotito offer"/>
        <p>{offerId.tags.join(', ')}</p>
      </div>
      <div>
        <div><h2>info Proposals</h2></div>
        <div>{offerId?.map((e:any)=>{
          return (
            <div>
              <span>{e.name}</span>
              <span>{e.remunerationProposal}</span>
              <span>{e.proposal_description}</span>
              <span>{e.worked_time}</span>
            </div>
          )
        })}</div>
      </div>
    </div>

  )
}

export default DetailOffer