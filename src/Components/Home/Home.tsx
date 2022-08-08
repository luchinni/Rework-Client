import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {getOffers} from "../../Redux/Reducer/reducer";
import CardsOffer from '../CardsOffer/CardsOffer';
import Filtros from '../Filtros/Filtros';
import Header from '../Header/Header';
import './Home.css';
import Banner from './Banner/Banner';
import goUpIcon from "../../images/arrow_upward_FILL0_wght400_GRAD0_opsz48.png"
import CardsWorker from '../CardsWorker/CardsWorker';

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  const search = useSelector((state:any) => state.workService.search);
  const infoSearched = useSelector((state:any) => state.workService.infoSearched);
  let [ITEMS_PER_PAGE, setItemsPerPage] = useState(5);
  let [items, setItems] = useState([...offers]?.splice(0, ITEMS_PER_PAGE));
  let [itemSearched, setItemSearched] = useState([...infoSearched]?.splice(0, ITEMS_PER_PAGE));
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [])

  useEffect(() => {
    if(search===""){
      console.log(offers);
      setItems([...offers]?.splice(0, ITEMS_PER_PAGE))
    }
  }, [offers, search])

  useEffect(() => {
    if(search==="worker")setItemSearched([...infoSearched]?.splice(0, ITEMS_PER_PAGE))
    if(search==="offer")setItems([...infoSearched]?.splice(0, ITEMS_PER_PAGE))

  }, [infoSearched])

const handleMore = () => {
  setItemsPerPage(ITEMS_PER_PAGE+5)

  if(search!==""){
    setItemSearched([...infoSearched]?.splice(0, ITEMS_PER_PAGE))
  }else{
    setItems([...offers]?.splice(0, ITEMS_PER_PAGE))
  }
}

const informationSend = () =>{
  if(search==="worker"){
    return itemSearched;
  }else if(search==="offer"){
    return items;
  }else{
    return items;
  }
}

window.onscroll = function () {
  if (document.documentElement.scrollTop > 600 || document.documentElement.scrollTop > 700) {
    document.querySelector("#goTopCont")?.classList.add("show")
  } else {
    document.querySelector("#goTopCont")?.classList.remove("show")
  }
}

const goUp = () => {
  window.scrollTo({
   top: 0,
   behavior: "smooth" 
 })
}

console.log(search)

  return (
    <div className='Home_component'>
      <Header/>
      <div className='div_BannerAndCards'>
        <Banner/> 
        <div className='div_homeCards'>
          {search!=="worker"?<CardsOffer props={informationSend()} />:<CardsWorker props={informationSend()}/>}
          <Filtros />
        </div>
        {items.length<offers.length?
        <div className='div_btnHome'>
          <div className='span_more'>
              <span id='uno'/>
              <span id='dos'/>
              <span id='tres'/>
            </div>
            <div>
            <button className='btn_moreCards2' onClick={() => handleMore()}>Cargar mas</button>
            </div>
          </div>:<span/>}
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