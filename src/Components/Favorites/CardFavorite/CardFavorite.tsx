import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CardFavorite.css'

const CardFavorite = ({props}:any) => {
   
  const navigate = useNavigate()

  return (
    <div className='CardFavorite_component'>   
      <button className='favorites_btn' onClick={() => navigate(`/detailOffer/${props.idOffer}`)}>
        <span className='CardFavorite_span'>
          {props.title}
        </span>
      </button>         
    </div>
  )
}

export default CardFavorite