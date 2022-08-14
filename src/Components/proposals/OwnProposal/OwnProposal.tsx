import React from 'react'
import CardProposal from '../CardProposal/CardProposal';

const OwnProposal = ({offer, idWorker}:any) => {

    
    const filtred:any = offer.proposals?.filter((p: any) => p.userWorker.id === idWorker)
    console.log(filtred)
    {return (
    filtred?.length > 0 ?
        <div className='Detail_divProposal'>
            <CardProposal key={idWorker + 100*Math.random()} props={filtred[0]} offer={offer}/>
        </div>
  : null
  )}
}

export default OwnProposal