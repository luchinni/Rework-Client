import React from 'react'
import CardWorker from '../CardWorker/CardWorker'
import './CardsWorker.css'

const CardsWorker = ({props}:any) => {
  return (
    <div className='div_cardContainer'>
      {props && props?.map((o:any, i:any) =>{
        return(
          <CardWorker key={i} props={o} />
        )
      })}
    </div>
  )
}

export default CardsWorker