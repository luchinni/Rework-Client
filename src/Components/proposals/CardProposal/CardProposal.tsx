import React from 'react'
import '../../Offer/DetailOffer/DetailOffer.css';
import { useDispatch } from 'react-redux';
import { acceptProposal } from '../../../Redux/Reducer/reducer';

const CardProposal = ({props, offer}:any) => {
  console.log("la offer que llegan a card: ", offer)
  console.log("las props que llegan a card: ", props)
  const dispatch = useDispatch();
  

 const handleClick = () => {
  props.state = "acepted";
  const state = props.state
  const id = props.idProposal
  const proposalState:object = {
    state,
    id
  }
  dispatch(acceptProposal(proposalState))

  }

  return (
    <div className='Detail_Proposal'>              
                <p className='DetailP_UserName'>{props.userWorker?.name}</p>
                <p className='DetailP_remuneration'>{`Presupuesto ARS: ${props?.remuneration}`}</p>
                <p className='DetailP_propuestaUser'>{props?.proposal_description}</p>
                <p className='DetailP_timeUser'>{`Tiempo estimado de entrega: ${props?.worked_time}`}</p>
                <button name="button" onClick={handleClick}>Aceptar</button>
              </div>
  )
}

export default CardProposal