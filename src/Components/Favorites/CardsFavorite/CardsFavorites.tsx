import React from 'react'
import CardFavorite from '../CardFavorite/CardFavorite';
import './CardsFavorites.css';


const CardsFavorites = ({favoriteInfo}:any) => {
  console.log(favoriteInfo)
  return (
    <div className='CardsFavorites_component'>
      <div className='Favorites_title'>
        <span>Ofertas guardadas</span>
      </div>
      <div className='CardFavorite_component'>
            {
              favoriteInfo && favoriteInfo?.map((o:any, i:any) =>{
          return  <CardFavorite key={i} props={o} />
        })

      }     
      </div>
    </div>
  )
}

export default CardsFavorites