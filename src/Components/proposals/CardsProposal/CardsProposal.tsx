import React from 'react'
import CardProposal from '../CardProposal/CardProposal';

const CardsProposal = ({offer}:any) => {

  return (
    <div className='Detail_divProposal'>
          {offer.proposals?.map((e:any, i:any)=>{
            console.log("el state", e.state)
            console.log("el active", e.isActive)
            { 
              (e.state === "cancelled"
            ||
              e.state === "rejected"
            ||
              e.state === "contract cancelled" 
            ||
              e.state === "contract rejected")
            ? 
              <></>
            : 
              <CardProposal key={i} props={e} offer={offer}/> 
          }
          })}
        </div>
  )
}

export default CardsProposal