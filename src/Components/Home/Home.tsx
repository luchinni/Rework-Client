import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import CardsOffer from '../CardsOffer/CardsOffer'
import {getOffer} from "../../Redux/Reducer/reducer"

const Home = () => {

  const offers = useSelector((state:any) => state.workService.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffer());
  }, [])

console.log(offers)
  return (
    <div>
      <div>
        <CardsOffer props={offers} />
      </div>
    </div>
  )
}

export default Home