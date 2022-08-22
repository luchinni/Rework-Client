import React, { useState } from "react";
import "../../Offer/DetailOffer/DetailOffer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptProposal,
  isActiveFalseProposal,
  stateCancelledProposal,
} from "../../../Redux/Reducer/reducer";
import FormEditProposal from "../FormProposal/FormEditProposal"
import Swal from "sweetalert2";
import Header from "../../Header/Header";

const CardProposal = ({ props, offer }: any) => {
  //console.log("la offer que llegan a card: ", offer);
  //console.log("las props que llegan a card: ", props);
  const currentUser = useSelector(
    (state: any) => state.workService.currentUser
  );

  const handleClick = () => {
        let state = "accepted";
        let id = props.idProposal;
        let proposalState: { state: string; id: string } = {
          state,
          id,
        };
        acceptProposal(proposalState);
        Swal.fire(
          '¡Felicitaciones!',
          '¡Aceptaste la propuesta!',
          'success'
        )
    };
  

  const [edition, setEdition] = useState(false);

  const handleEdition = () => {
    setEdition(true);
  };

  const handleCloseEdition = (value: any) => {
    setEdition(value);
  };

  const handleCancelation = (id: string) => {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar tu postulación?",
      text: "No podrás revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Confirmar",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        stateCancelledProposal(id);
        isActiveFalseProposal(id);
        Swal.fire({
          title: "¡Eliminada!",
          text: "Tu postulación fue eliminada.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "¡Listo!",
        });
      }
    });
  };

  return (
    <div className="Detail_Proposal">
      {edition && (
        <div className="Detail_divModal">
          <FormEditProposal
            close={handleCloseEdition}
            proposal={props}
          />
        </div>
      )}

      <p className="DetailP_UserName">{props.userWorker?.name}</p>
      <p className="DetailP_remuneration">{`Presupuesto ARS: ${props?.remuneration}`}</p>
      <p className="DetailP_propuestaUser">{props?.proposal_description}</p>
      <br></br>
      <br></br>
      <br></br>
      <p className="DetailP_timeUser">{`Tiempo estimado de entrega: ${props?.worked_time}`}</p>
      {offer.userClientId === currentUser.id && props.state === "posted"? (
        <button name="button" className="DetailP_button" onClick={handleClick}>
          Aceptar
        </button>
      ) : null}
      {props.userWorker.id === currentUser.id &&
      currentUser.isPremium === true ? (
        <button
          name="button"
          className="DetailP_button"
          onClick={handleEdition}
        >
          Editar
        </button>
      ) : null}
      {props.userWorker.id === currentUser.id ? (
        <button
          name="button"
          className="DetailP_button"
          onClick={() => handleCancelation(props?.idProposal)}
        >
          Cancelar
        </button>
      ) : null}
    </div>
  );
};

export default CardProposal;
