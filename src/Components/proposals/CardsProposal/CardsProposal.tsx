import React from 'react'
import CardProposal from '../CardProposal/CardProposal';

const CardsProposal = ({offer}:any) => {

  return (
    <div className='Detail_divProposal'>
          {offer.proposals?.map((e:any, i:any)=>{

            {e.isActive === true ? <CardProposal key={i} props={e} offer={offer}/> : <></>}
          })}
        </div>
  )
}

export default CardsProposal