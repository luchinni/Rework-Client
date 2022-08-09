import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {getOfferId} from '../../Redux/Reducer/reducer';
import Header from '../Header/Header';
import copy from '../../images/copy.svg';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Toaster, toast} from "react-hot-toast";
import { Link } from 'react-router-dom';
import DetailModal from './DetailModal/DetailModal';
import './DetailOffer.css';
import { useParams } from 'react-router-dom';

const DetailOffer = () => {

  const offerId = useSelector((state:any) => state.workService.offerById);
  
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getOfferId(params.id));
  }, [dispatch])

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    
  <div className={open ? 'Detail_component modalOpen' : 'Detail_component'}>
    <Header/>

    {open && 
    
      <div className='Detail_divModal'>
        <button onClick={handleClose} className='Detail_ModalClose'>x</button>
        <DetailModal />
      </div>
    }

     <div className='Detail_detail'>

       <div>
         <div className='Detail_User'>
           <div className='Detail_divUserImage'>
             <img className='Detail_userPhoto' src={offerId.userClient?.photo} alt="fotito" loading='lazy'/>
           </div>
           <Link to='#' className='Detail_NameUserPost'>{offerId.userClient?.name}</Link>
           <p className='Detail_UserRating'>Rating {offerId.userClient?.rating}</p>
           <p className='Detail_offersCount'>Publicaciones: {offerId?.offersCount}</p>
           <div>
             <div className='Detail_urlCopy'>
               <div className='Detail_divUrl'>
                 <span className='Detail_url'>url publicación</span>
               </div>
               <div className='Detail_divCopy'>
                 <CopyToClipboard text={window.location.href}>
                   <button onClick={() => toast.success('Copiado', {position: 'top-right'})} className='Detail_buttonCopy'>
                     <img className='Detail_Copy' src={copy} alt="copy" />
                   </button>
                 </CopyToClipboard>
                 <Toaster/>
               </div>
             </div>
           </div>
         </div>
       </div>
  
       <div className='Detail_infoProposal'>
         <div className='Detail_offer'>
           <div className='Detail_titleTime'>
             <h2 className='Detail_title'>{offerId?.title}</h2>
             <p className='Detail_time'>{`Tiempo aproximado del trabajo : ${offerId?.work_duration_time} dias`}</p>
           </div>
           <p className='Detail_remuneration'>{`Paga estimada ARS: ${offerId.min_remuneration} - ${offerId.max_remuneration}`}</p>
           <p className='Detail_description'>{offerId?.offer_description}</p>
           <div className='Detail_divImages'>
             <img className='Detail_images' src={offerId?.photo} alt="fotito offer" loading='lazy'/>
           </div>
           <p className='Detail_tags'>{offerId.profession?.join(', ')}</p>
           <button className='Detail_buttonApply' onClick={handleOpen}>Aplicar</button>
         </div>
       </div>
     </div>

     <h2 className='Detail_h2Propuestas'>propuestas</h2>
     <div className='Detail_divProposal'>
       {offerId.proposals?.map((e:any)=>{
         return (
           <div className='Detail_Proposal'>
             <p className='DetailP_UserName'>{e.userWorker?.name}</p>
             <p className='DetailP_remuneration'>{`Presupuesto ARS: ${e?.remuneration}`}</p>
             <p className='DetailP_propuestaUser'>{e?.proposal_description}</p>
             <p className='DetailP_timeUser'>{`Tiempo estimado de entrega: ${e?.worked_time}`}</p>
           </div>
         )
       })}
     </div>
   </div>

  )
}

export default DetailOffer