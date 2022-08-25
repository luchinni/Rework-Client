import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CardFavorite.css'

const CardFavorite = ({props}:any) => {
   
  const navigate = useNavigate()

  return (
    <div >   
      <button className='favorites_btn' onClick={() => navigate(`/detailOffer/${props.idOffer}`)}>{props.title}</button>         
    </div>
  )
}

export default CardFavorite