import React, {useRef, useState} from 'react';
import './CardOffer.css';
import {Link} from 'react-router-dom';
import more from '../../../images/more.svg';
import save from "../../../images/icon_guardar.png";
import report from '../../../images/icon_report.svg';
import { useDispatch, useSelector } from 'react-redux';
import decode from "jwt-decode"
import { remFavorite, getFavorites, getFavoritestoDB, remFavoritestoDB, getUserById } from '../../../Redux/Reducer/reducer';
import {BsBookmarksFill, BsBookmarks} from "react-icons/bs";
import { ratingStars } from "../../WorkerHome/CardWorker/CardWorker";
import useOnClickOutside from "../../../utils/utils"

const CardOffer = ({props}:any) => {
  
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();
  const favorites = useSelector((state:any) => state.workService.favorites);
  const currentUser = useSelector((state:any) => state.workService.currentUser);
  const userLogged = useSelector((state: any) => state.workService.userLogged);
  const token:any = localStorage.getItem("token")
  let tokenDecode:any
  if(token){tokenDecode = decode(token)}

  function handleClick() {
    setOpen(!open);
  }

  const addFavorite = async (props:any) => {
    //console.log(userLogged)
    if(currentUser.id !== ''){
      console.log(props.idOffer);
      if(userLogged.favorites?.find((f:any) => f.idOffer === props.idOffer)){
        await remFavoritestoDB(props, currentUser.id);
        return dispatch(getUserById(tokenDecode))
      }else{
        await getFavoritestoDB(props, currentUser.id);
        return dispatch(getUserById(tokenDecode))
      }
    }else{
      if(favorites.includes(props)){
        return dispatch(remFavorite(props));
      }else{
        console.log(props);
        return dispatch(getFavorites(props));
      }
    }
    
}

  const showFavorite = (props:any) => {
    const favoritesStorage:any = localStorage.getItem("favorites");
    const storageParsed:any = JSON.parse(favoritesStorage);
    let allFavorites:any
    console.log(userLogged)
    if(currentUser.id !== ''){
      allFavorites = userLogged.favorites?.map((f:any) => {
        if(f?.idOffer === props.idOffer){
            return f
        }
    })
    }else{
      allFavorites = storageParsed?.map((f:any) => {
        if(f?.idOffer === props.idOffer){
            return f
        }
    })
    }
    
    if(props.idOffer==="1f8p") return;    
    if(allFavorites?.filter((e:any)=>e)[0]?.title === props.title){
        return <BsBookmarksFill className='guardar_icon'/>
    }else{
        return <BsBookmarks className='guardar_icon'/>
    }
}

const userDiv = useRef(null);

function handleClickOutside() {
  setOpen(false)
}

useOnClickOutside(userDiv, handleClickOutside);



  return (
    <div className='CardOffer_component'>
      <div className='div_userSection'>
        <div className='div_infoWorkSection'>
          <span className='card_title'>{props.title}</span>
          <div className='div_cardDescription'>
            <p>{props.offer_description}</p>
          </div>
          <div className='div_bottomData'>
            <div>
              <div className='div_remuneration'>
                <span>ARS </span>
                <span>{`${props.min_remuneration} - ${props.max_remuneration}`}</span>
                <span>$</span>
              </div>
              <div className='card_divTags'>
                {
                  props.profession.length > 4 ? <span>{props.profession[0]}, {props.profession[1]}, {props.profession[2]}, {props.profession[3]}</span>
                  : <span className='card_tags'>{props.profession?.join(', ')}</span>
                }
              </div>
            </div>
            
          </div>
        </div>
        
        <div className='div_cardButton'>
          <button onClick={()=> handleClick()} className='cardButton_options'>
            <img className='more' src={more} alt="more" />
          </button>
          {open &&
            <div className='Card_option' ref={userDiv}>
              <div className='CardOption_divGuardar' onClick={(e) => {addFavorite(props)}}>
                <span className='report_cardButton'>Guardar</span>
                {showFavorite(props)}
              </div>
              <div className='CardOption_divReport'>
                <span className='report_cardButton'>Reportar</span>
                <img className='report_icon' src={report} alt="report" />
              </div>
            </div>
          }
        </div>
      </div>
      <hr className='CardOffer_hr' />
      <div className="Card_footer">
        <div className='div_dataUser'>
          <div className='Card_divContImageProfile'>
            <img className='Card_profileImage' src={props.userClient?.photo || props.userWorker?.photo} alt="Client Photo" />
          </div>
          <div className='div_userData'>
            <Link to={`/profile/${props.userClientId || props.userWorkerId}`} className='Card_userName'>{props.userClient?.name}</Link>
            <span className='Card_userRating'>{props.userClient?.rating ? ratingStars(props.userClient.rating) : ratingStars(0)}</span>
          </div>
        </div>
        <div className='Card_more'>
          <Link className='button_details' to={`/detailOffer/${props.idOffer}`}>Ver oferta</Link>
        </div>
      </div>
    </div>
  )
}

export default CardOffer
