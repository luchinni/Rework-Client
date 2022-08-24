import React from 'react'
import CardProposal from '../CardProposal/CardProposal';

const CardsProposal = ({offer}:any) => {

  return (
    <div className='Detail_divProposal'>
          {offer.proposals?.map((e:any, i:any)=>{
              (e.state === "cancelled") 
              ||
              (e.state === "contract cancelled") 
              ||
              (e.state === "contract rejected") 
              ||
              (e.state === "contract started") 
              ?
              null
              : 
              <CardProposal key={i} props={e} offer={offer}/>
          })}
        </div>
  )
}

export default CardsProposal