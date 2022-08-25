import React from 'react'
import CardProposal from '../CardProposal/CardProposal';

const CardsProposal = ({offer}:any) => {
  console.log("que me llega???", offer)
  return (
    <div className='Detail_divProposal'>
      {offer.proposals?.map((e:any, i:any)=>{
        <CardProposal key={i} props={e} offer={offer}/>
        })
      }
    </div>
  )
}

export default CardsProposal