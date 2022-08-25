import React from 'react'
import { useSelector } from 'react-redux';
import CardFavorite from '../CardFavorite/CardFavorite';

import './CardsFavorites.css';


const CardsFavorites = ({favoriteInfo}:any) => {
  console.log(favoriteInfo)
  const currentUser = useSelector((state:any) => state.workService.currentUser);
  return (
    <div className='CardsFavorites_component'>
      <div className='Favorites_title'>
        <span>Ofertas guardadas</span>
      </div>
      {currentUser.id === '' 
      ? <span className='CardsFavorites_guestMessage'>Tus ofertas guardadas aparecerán al iniciar sesión</span> 
      : currentUser.id !== '' ? favoriteInfo?.length === 0
      ? <span className='CardsFavorites_guestMessage'>Aún no has guardado ofertas</span>
      : "" : ""}
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