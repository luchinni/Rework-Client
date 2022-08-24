import React from 'react'
import { useNavigate } from 'react-router-dom'
import './CardFavorite.css'

const CardFavorite = ({props}:any) => {
   
    const navigate = useNavigate()
console.log("Card: ", props)
  return (
    <div >
        <div className='favorites_DivConteiner' onClick={() => navigate(`/detailOffer/${props.idOffer}`)}>
            <h4>{props.title}</h4>    
        </div>
    </div>
  )
}

export default CardFavorite