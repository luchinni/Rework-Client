import React from 'react'
import '../../Offer/DetailOffer/DetailOffer.css';
import { useDispatch, useSelector } from 'react-redux';
import { acceptProposal, isActiveFalseProposal } from '../../../Redux/Reducer/reducer';
import Swal from "sweetalert2";

const CardProposal = ({props, offer}:any) => {
  console.log("la offer que llegan a card: ", offer)
  console.log("las props que llegan a card: ", props)
  const dispatch = useDispatch();
  
  const currentUser = useSelector((state: any) => state.workService.currentUser);
console.log("currentUser", currentUser)
 const handleClick = () => {
   // props.state = "accepted";
   offer.proposals?.forEach((e: any) => {
     if (e.idProposal !== props.idProposal) {
       let state = "rejected";
       let id = e.idProposal;
       let proposalState: { state: string; id: string } = {
         state,
         id,
       };
       acceptProposal(proposalState);
     } else {
       let state = "accepted";
       let id = props.idProposal;
       let proposalState: { state: string; id: string } = {
         state,
         id,
       };
       acceptProposal(proposalState);
     }
   });
 };

 const handleEdition = () => {};

 const handleCancelation = (id: string) => {
  Swal.fire({
  title: '¿Estás seguro que quieres eliminar tu postulación?',
  text: "No podrás revertir el cambio",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
}).then((result) => {
  if (result.isConfirmed) {
//    stateCancelledProposal(id);          no tiene un estado cancelado o eliminado
    isActiveFalseProposal(id);
    Swal.fire(
      '¡Eliminada!',
      'Tu postulación fue eliminada.',
      'success'
    );
  };
});
};
  
  return (
    <div className='Detail_Proposal'>              
      <p className='DetailP_UserName'>{props.userWorker?.name}</p>
      <p className='DetailP_remuneration'>{`Presupuesto ARS: ${props?.remuneration}`}</p>
      <p className='DetailP_propuestaUser'>{props?.proposal_description}</p>
      <br></br>
      <br></br>
      <br></br>
      <p className='DetailP_timeUser'>{`Tiempo estimado de entrega: ${props?.worked_time}`}</p>
      {props.userWorker.isWorker === false ?
      <button name="button" className="DetailP_button" onClick={handleClick}>Aceptar</button> : null}
      {props.userWorker.id === currentUser.id && currentUser.isPremium === true ?
      <button name="button" className="DetailP_button" onClick={handleEdition}>Editar</button> : null}
      {props.userWorker.id === currentUser.id ?
      <button name="button" className="DetailP_button" onClick={() => handleCancelation(props?.idProposal)}>Cancelar</button> : null}
    </div>
  )
}

export default CardProposal