import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './CardFavorite.css'

const CardFavorite = ({props, onClose}:any) => {
   
  const navigate = useNavigate()

  return (
    <div className='CardFavorit'>  
    <div className='favorites_btn' >
        <span onClick={() => navigate(`/detailOffer/${props.idOffer}`)} className='CardFavorite_span'>
          {props.title}
        </span>
      <button className='CardFavorite_btnClose' onClick={() => onClose(props)}>X</button>
    </div>        
    </div>
  )
}

export default CardFavorite