import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getOffers} from "../../Redux/Reducer/reducer";
import CardsOffer from '../CardsOffer/CardsOffer';
import Filtros from '../Filtros/Filtros';
import Header from '../Header/Header';
import './Home.css';
import Banner from './Banner/Banner';

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch])

  return (
    <div className='Home_component'>
      <Header/>
      <div className='div_BannerAndCards'>
        <Banner/> 
        <div className='div_homeCards'>
          <CardsOffer props={offers} />
          <Filtros />
        </div>
      </div>
    </div>
  )
}

export default Home