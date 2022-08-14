import React from 'react'
import '../../Offer/DetailOffer/DetailOffer.css';


const CardProposal = ({props}:any) => {
  console.log(props)
  return (
    <div className='Detail_Proposal'>              
                <p className='DetailP_UserName'>{props.userWorker?.name}</p>
                <p className='DetailP_remuneration'>{`Presupuesto ARS: ${props?.remuneration}`}</p>
                <p className='DetailP_propuestaUser'>{props?.proposal_description}</p>
                <p className='DetailP_timeUser'>{`Tiempo estimado de entrega: ${props?.worked_time}`}</p>
              </div>
  )
}

export default CardProposal