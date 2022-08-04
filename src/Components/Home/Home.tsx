import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import CardsOffer from '../CardsOffer/CardsOffer'
import {getOffers} from "../../Redux/Reducer/reducer"
import './Home.css'

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch])


  return (
    <div className='Home_component'>
      <CardsOffer props={offers} />
    </div>
  )
}

export default Home