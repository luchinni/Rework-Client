import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {checkSession, getOfferId, stateCancelledOfferPost, isActiveFalseOfferPost} from '../../../Redux/Reducer/reducer';
import Header from '../../Header/Header';
import copy from '../../../images/copy.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Toaster, toast} from "react-hot-toast";
import { Link } from 'react-router-dom';
import FormProposal from '../../proposals/FormProposal/FormProposal';
import CardsProposal from '../../proposals/CardsProposal/CardsProposal';
import './DetailOffer.css';
import { useParams } from 'react-router-dom';
import OwnProposal from '../../proposals/OwnProposal/OwnProposal';
import Swal from "sweetalert2";

const DetailOffer = () => {

  const offerId = useSelector((state:any) => state.workService.offerById);
  console.log("la offer", offerId)
  const currentUser = useSelector((state: any) => state.workService.currentUser)
 console.log("el user", currentUser)
  
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getOfferId(params.id));
    dispatch(checkSession())
  }, [dispatch])

  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true)
  }

  function handleClose(value:any) {
    setOpen(value)
  }

  function handleDelete(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        stateCancelledOfferPost(id);
        isActiveFalseOfferPost(id);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      };
    });
  };

  let alreadyApply: boolean = false

  const filtred:any = offerId.proposals?.filter((p: any) => p.userWorker?.id === currentUser?.id)

  if(filtred?.length > 0){
    alreadyApply = true
    console.log("encontre", alreadyApply)
  } else {
    alreadyApply = false
    console.log("no encontre", alreadyApply)
  }
  

  return (
    
  <div className={open ? 'Detail_component modalOpen' : 'Detail_component'}>
    <Header/>

    {open && 
    
      <div className='Detail_divModal'>
        <FormProposal idOferta={offerId.idOffer} close={handleClose} />
      </div>
    }

     <div className={open ? 'Detail_detail open'  : 'Detail_detail'}>

       <div>
         <div className='Detail_User'>
           <div className='Detail_divUserImage'>
             <img className='Detail_userPhoto' src={offerId.userClient?.photo} alt="fotito" loading='lazy'/>
           </div>
           <Link to={`/profile/${offerId.userClientId}`} className='Detail_NameUserPost'>{offerId.userClient?.name}</Link>
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
             <p className='Detail_time'>{`Tiempo aproximado del trabajo : ${offerId?.work_duration_time}`}</p>
           </div>
           <p className='Detail_remuneration'>{`Paga estimada ARS: ${offerId.min_remuneration} - ${offerId.max_remuneration}`}</p>
           <p className='Detail_description'>{offerId?.offer_description}</p>
           <div className='Detail_divImages'>
             <img className='Detail_images' src={offerId?.photo} alt="fotito offer" loading='lazy'/>
           </div>
           <p className='Detail_tags'>{offerId.profession?.join(', ')}</p>
           {alreadyApply === false && currentUser.isWorker === true ?
           <button className='Detail_buttonApply' onClick={handleOpen}>Aplicar</button>
           :
            <br/>
           }
           {currentUser?.id === offerId.userClientId && offerId.isActive === true ?
           <button className='Detail_buttonApply' onClick={() => handleDelete(offerId.idOffer)}>Eliminar</button>
           :
            <br/>
           }
         </div>
       </div>
     </div>
     { 
     //si la offer es del client logeado actualmente, o el user actual es admin o premium
     offerId.userClientId === currentUser.id || currentUser.isAdmin === true || currentUser.premium === true ?
     //renderiza las cards completas
     <div>
      <h2 className='Detail_h2Propuestas'>propuestas</h2>
       <CardsProposal offer={offerId}/>
      </div>
      : 
      //si el usuario es worker pero no premium, que le renderice su propuesta enviada
        currentUser.isPremium === false && currentUser.isWorker === true ?
        
      <div className='Detail_divCardPropuestas'>
          <OwnProposal offer={offerId} idWorker={currentUser.id}/>
          <div>
          <button className='Detail_premiumButton'>
            Quieres ver las propuestas de tus competidores? Si eres freelancer, conviertete en premium!
          </button>
          </div> 
      </div>
      :
//la opcion que queda es que sea un user client 
      <br/>
     }  
      </div>
  )
}

export default DetailOffer