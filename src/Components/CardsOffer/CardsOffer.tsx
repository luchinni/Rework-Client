import React from 'react'
import CardOffer from '../CardOffer/CardOffer'

const CardsOffer = (props:any) => {
  return (
    <div>
      <span> mapeo para pasarle la info a card</span>
      {props.map((o:any) =>{
        return(
          <CardOffer props={o} />
        )
      })}
    </div>
  )
}

export default CardsOffer