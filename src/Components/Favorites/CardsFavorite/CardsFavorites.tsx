import React from 'react'
import CardFavorite from '../CardFavorite/CardFavorite'

const CardsFavorites = ({favoriteInfo}:any) => {
  console.log(favoriteInfo)
  return (
    
    <div>
          {favoriteInfo && favoriteInfo?.map((o:any, i:any) =>{
        return(
          <CardFavorite key={i} props={o} />
        )
      })}
    </div>
  )
}

export default CardsFavorites