import React from 'react'
import CardReview from '../CardReview/CardReview';

const CardsReview = ({review}:any) => {
  return (
    <div>
      {review && review?.map((o:any, i:any) =>{
        return(
          <CardReview key={i} /*review={o}*/ />
        )
      })}
    </div>
  )
}

export default CardsReview