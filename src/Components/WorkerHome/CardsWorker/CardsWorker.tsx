import React from 'react'
import CardWorker from '../CardWorker/CardWorker'

const CardsWorker = ({props}:any) => {
    console.log(props);
  return (
    <div>
      {props && props?.map((o:any, i:any) =>{
        return(
          <CardWorker key={i} props={o} />
        )
      })}
    </div>
  )
}

export default CardsWorker