import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {getOffers} from "../../Redux/Reducer/reducer";
import CardsOffer from '../CardsOffer/CardsOffer';
import Filtros from '../Filtros/Filtros';
import Header from '../Header/Header';
import './Home.css';
import Banner from './Banner/Banner';

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  var [items, setItems] = useState([...offers]?.splice(0, ITEMS_PER_PAGE))
  var [ITEMS_PER_PAGE, setItemsPerPage] = useState(5)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
    setItems([...offers]?.splice(0, ITEMS_PER_PAGE))
  }, [offers])

const handleMore = () => {
  setItemsPerPage(ITEMS_PER_PAGE+5)
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
        <div className='div_btnHome'>
        <div className='span_more'>
            <span id='uno'/>
            <span id='dos'/>
            <span id='tres'/>
          </div>
          <div>
          <button className='btn_moreCards2' onClick={() => handleMore()}>Cargar mas</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home