import React from 'react'
import CardFavorite from '../CardFavorite/CardFavorite';


const CardsFavorites = ({favoriteInfo}:any) => {
  console.log(favoriteInfo)
  return (
    
    <div className='CardFavorite_component'>
          {
            favoriteInfo?
            favoriteInfo && favoriteInfo?.map((o:any, i:any) =>{
        return  <CardFavorite key={i} props={o} />
      }) : "Props de local storage y mapearlo"
        
    }
       
    </div>
  )
}

export default CardsFavorites