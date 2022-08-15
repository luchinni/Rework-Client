import React from 'react'
import CardProposal from '../CardProposal/CardProposal';

const CardsProposal = ({offer}:any) => {


  return (
    <div className='Detail_divProposal'>
          {offer.proposals?.map((e:any, i:any)=>{
            
            console.log("e",e,"i" ,i)
            return (
                <CardProposal key={i} props={e} offer={offer}/>
            )
          })}
        </div>
  )
}

export default CardsProposal