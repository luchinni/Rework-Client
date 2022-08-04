import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getOffer} from "../../Redux/Reducer/reducer";
import CardsOffer from '../CardsOffer/CardsOffer';
import Filtros from '../Filtros/Filtros';
import './Home.css';

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffer());
  }, [])

console.log(offers)
  return (
    <div className='Home_component'>
      <CardsOffer props={offers} />
      <Filtros />
    </div>
  )
}

export default Home