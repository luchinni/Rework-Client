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

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  var [items, setItems] = useState([...offers]?.splice(0, ITEMS_PER_PAGE))
  var [ITEMS_PER_PAGE, setItemsPerPage] = useState(5)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [])

  useEffect(() => {
    setItems([...offers]?.splice(0, ITEMS_PER_PAGE))
  }, [items])

const handleMore = () => {
  setItemsPerPage(ITEMS_PER_PAGE+5)
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


  return (
    <div className='Home_component'>
      <Header/>
      <div className='div_BannerAndCards'>
        <Banner/> 
        <div className='div_homeCards'>
          {items?<CardsOffer props={items} />:"Loading..."}
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