import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {checkSession, getOffers, favoritesToDB, getUserById, verifyToken} from "../../Redux/Reducer/reducer";
import CardsOffer from '../Offer/CardsOffer/CardsOffer';
import Filtros from '../Filtros/Filtros';
import Header from '../Header/Header';
import decode from "jwt-decode"
import './Home.css';
import Banner from './Banner/Banner';
import goUpIcon from "../../images/arrow_upward_FILL0_wght400_GRAD0_opsz48.png"
import CardsWorker from '../WorkerHome/CardsWorker/CardsWorker';
import jwt from 'jsonwebtoken'
import Carrusel from './Carrusel/Carrusel';


const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  const search = useSelector((state:any) => state.workService.search);
  const infoSearched = useSelector((state:any) => state.workService.infoSearched);
  const currentUser = useSelector((state:any) => state.workService.currentUser);

  let [ITEMS_PER_PAGE, setItemsPerPage] = useState(5);
  let [items, setItems] = useState([...offers]?.splice(0, ITEMS_PER_PAGE));
  let [itemSearched, setItemSearched] = useState([...infoSearched]?.splice(0, ITEMS_PER_PAGE));

  const dispatch = useDispatch();
  const favoritesStorage:any = localStorage.getItem("favorites");
  const storageParsed:any = JSON.parse(favoritesStorage);
  const token:any = localStorage.getItem("token")

  let tokenDecode:any
  if(token){tokenDecode = decode(token)}
  
  
  if(storageParsed?.length>0 && currentUser.id !== ''){
    dispatch(favoritesToDB(storageParsed, currentUser.id));

  }

  useEffect(() => {
    dispatch(getOffers());
    dispatch(checkSession())
  }, [])

  useEffect(() => {
    dispatch(verifyToken(tokenDecode))
  }, [tokenDecode])

  useEffect(() => {
    dispatch(getUserById(tokenDecode))
  }, [currentUser])
 

  useEffect(() => {
    if(search===""){
      setItems([...offers]?.splice(0, ITEMS_PER_PAGE))
    }
  }, [offers, search])

  useEffect(() => {
    if(search==="worker")setItemSearched([...infoSearched]?.splice(0, ITEMS_PER_PAGE))
    if(search==="offer")setItems([...infoSearched]?.splice(0, ITEMS_PER_PAGE))

  }, [infoSearched])

const handleMore = () => {
  setItemsPerPage(ITEMS_PER_PAGE+5)
  if(search==="worker"){
    setItemSearched([...infoSearched]?.splice(0, ITEMS_PER_PAGE))
  }else if(search==="offer"){
    setItems([...infoSearched]?.splice(0, ITEMS_PER_PAGE))
  }else{
    setItems([...offers]?.splice(0, ITEMS_PER_PAGE))
  }
}

const informationSend = () =>{
  if(search==="worker"){
    return itemSearched;
  }else if(search==="offer"){
    return [...items].splice(0, ITEMS_PER_PAGE);
  }else{
    return items;
  }
}

window.addEventListener("scroll", function() {
  if (document.documentElement.scrollTop > 600 || document.documentElement.scrollTop > 700) {
    document.querySelector("#goTopCont")?.classList.add("show")
  } else {
    document.querySelector("#goTopCont")?.classList.remove("show")
  }
})

const goUp = () => {
  window.scrollTo({
   top: 0,
   behavior: "smooth"
 })
}

const showButton = () => {
  if(search===""){
    if(items.length<offers.length){
      return (<div className='div_btnHome'>
    <div className='span_more'>
        <span id='uno'/>
        <span id='dos'/>
        <span id='tres'/>
      </div>
      <div>
      <button className='btn_moreCards2' onClick={() => handleMore()}>Cargar mas</button>
      </div>
    </div>)
    }
  }else if(search==="worker"){
    if(itemSearched.length<infoSearched.length){
      return (<div className='div_btnHome'>
    <div className='span_more'>
        <span id='uno'/>
        <span id='dos'/>
        <span id='tres'/>
      </div>
      <div>
      <button className='btn_moreCards2' onClick={() => handleMore()}>Cargar mas</button>
      </div>
    </div>)
    }
  }else if(search==="offer"){
    if(items.length<infoSearched.length){
      return (<div className='div_btnHome'>
    <div className='span_more'>
        <span id='uno'/>
        <span id='dos'/>
        <span id='tres'/>
      </div>
      <div>
      <button className='btn_moreCards2' onClick={() => handleMore()}>Cargar mas</button>
      </div>
    </div>)
    }
  }
}
    //Ejemplo de useSelector con Toolkit.
    // para hacer un console.log y ver si estaba andando la action.
    /*const global = useSelector((state: any) => state.workService.currentUser)
    console.log("AAAAAAAAAAAAAAAAAAA", global)*/
  return (
    <div className='Home_component'>
      <Header/>
      <div className='div_BannerAndCards'>

        <Banner/> 
        <div>
          <Carrusel/>
        </div>

        <div className='div_homeCards'>
          {search!=="worker"?<CardsOffer props={informationSend()} />:<CardsWorker props={informationSend()}/>}
          <Filtros />
        </div>
        {showButton()}
          </div>
      <div id='goTopCont' className="goTopCont">
        <div className="goTopBut" onClick={goUp}>
          <i><img src={goUpIcon} alt="goUpIcon" /></i>
        </div>
      </div>
    </div>
  )
}

export default Home