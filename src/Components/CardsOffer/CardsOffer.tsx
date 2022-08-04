import React from 'react'
import CardOffer from '../CardOffer/CardOffer'

const CardsOffer = ({props}:any) => {
  // console.log(props)
  return (
    <div>
      {props && props?.map((o:any) =>{
        return(
          <CardOffer props={o} />
        )
      })}
    </div>
  )
}

export default CardsOffer