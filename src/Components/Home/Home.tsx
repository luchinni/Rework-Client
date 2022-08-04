import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import CardsOffer from '../CardsOffer/CardsOffer'
import {getOffer} from "../../Redux/Reducer/reducer"

const Home = () => {

  const allClients = useSelector((state:any) => state.workService.allClients);
  const offers = useSelector((state:any) => state.workService.offers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffer());
  }, [])
  

  // const client: {name: string, photo: string, rating: number} = {
  //   name: "Jason",
  //   photo: "https://www.movilzona.es/app/uploads-movilzona.es/2019/07/Foto-de-Perfil-en-WhatsApp-650x340.jpg",
  //   rating: 3.7
  // }

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