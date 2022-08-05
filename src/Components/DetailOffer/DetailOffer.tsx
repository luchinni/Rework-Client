import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getOfferId} from '../../Redux/Reducer/reducer';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './DetailOffer.css';

const DetailOffer = () => {

  const offerId = useSelector((state:any) => state.workService.offerById);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferId());
  }, [dispatch])

  return (
    <div className='Detail_component'>
      <Header/>
      <div className='Detail_detail'>

        <div>
          <div className='Detail_User'>
            <div className='Detail_divUserImage'>
              <img className='Detail_userPhoto' src={offerId.photoClient} alt="fotito" />
            </div>
            <p className='Detail_NameUserPost'>{offerId.name}</p>
            <p className='Detail_UserRating'>Rating {offerId.rating}</p>
          </div>
        </div>
    
        <div className='Detail_infoProposal'>
          <div className='Detail_offer'>
            <div className='Detail_titleTime'>
              <h2 className='Detail_title'>{offerId.title}</h2>
              <p className='Detail_time'>{`Tiempo estimado del trabajo: ${offerId.work_duration_time}`}</p>
            </div>
            <p className='Detail_remuneration'>{`Paga estimada ARS: ${offerId.remuneration?.slice(0, 1)} - ${offerId.remuneration?.slice(1)}`}</p>
            <p className='Detail_description'>{offerId.description}</p>
            <div className='Detail_divImages'>
              <img className='Detail_images' src={offerId.photo} alt="fotito offer"/>
            </div>
            <p className='Detail_tags'>{offerId.tags?.join(', ')}</p>
            <button className='Detail_buttonApply'>Aplicar</button>
          </div>
        </div>
      </div>
      <h2 className='Detail_h2Propuestas'>propuestas</h2>
      <div className='Detail_divProposal'>
        {offerId.proposals?.map((e:any)=>{
          return (
            <div className='Detail_Proposal'>
              <p className='DetailP_UserName'>{e.name}</p>
              <p className='DetailP_remuneration'>{`Presupuesto ARS: ${e.remunerationProposal}`}</p>
              <p className='DetailP_propuestaUser'>{e.proposal_description}</p>
              <p className='DetailP_timeUser'>{`Tiempo estimado de entrega: ${e.worked_time}`}</p>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default DetailOffer