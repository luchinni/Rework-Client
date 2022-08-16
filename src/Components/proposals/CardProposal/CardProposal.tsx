import React from 'react'
import '../../Offer/DetailOffer/DetailOffer.css';
import { useDispatch } from 'react-redux';
import { acceptProposal } from '../../../Redux/Reducer/reducer';

const CardProposal = ({props, offer}:any) => {
  console.log("la offer que llegan a card: ", offer)
  console.log("las props que llegan a card: ", props)
  const dispatch = useDispatch();
  


 const handleClick = () => {
  // props.state = "accepted";

  offer.proposals?.map((e:any) => {
    if (e.idProposal !== props.idProposal){
      let state = "rejected"
      let id = e.idProposal
      let proposalState: {state:string, id:string} = {
        state,
        id
      }
      acceptProposal(proposalState)
    } else {
      let state = "accepted"
      let id = props.idProposal
      let proposalState: {state:string, id:string} = {
        state,
        id
      }
      acceptProposal(proposalState)
    }

  })
  }
  
  return (
    <div className='Detail_Proposal'>              
      <p className='DetailP_UserName'>{props.userWorker?.name}</p>
      <p className='DetailP_remuneration'>{`Presupuesto ARS: ${props?.remuneration}`}</p>
      <p className='DetailP_propuestaUser'>{props?.proposal_description}</p>
      <p className='DetailP_timeUser'>{`Tiempo estimado de entrega: ${props?.worked_time}`}</p>
      {props.userWorker.isWorker === false ?
      <button name="button" onClick={handleClick}>Aceptar</button> : null}
    </div>
  )
}

export default CardProposal