import React, { useEffect, useState } from "react";
import "../../Offer/DetailOffer/DetailOffer.css";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptProposal,
  isActiveFalseProposal,
  stateCancelledProposal,
  getProposalById
} from "../../../Redux/Reducer/reducer";
import FormEditProposal from "../FormProposal/FormEditProposal"
import Swal from "sweetalert2";
import Header from "../../Header/Header";
import { useNavigate } from "react-router-dom";

const CardProposal = ({ props, offer }: any) => {
  const currentUser = useSelector(
    (state: any) => state.workService.currentUser
  );
  const proposalById = useSelector(
    (state: any) => state.workService.proposalById
  );
  const proposalAccepted = offer.proposals.find((p: any) => p.state === 'accepted')
  const navigate = useNavigate();

  useEffect(() => {
    getProposalById(props.idProposal);
  console.log("toy en la card", props)
  }, [])


  const handleClick = () => {
    let state = "accepted";
    let id = props.idProposal;
    let proposalState: { state: string; id: string } = {
      state,
      id,
    };
    Swal.fire({
      title: '¿Estas seguro que deseas aceptar esta propuesta?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      icon: "question"
    }).then((response) => {
      if (response.isConfirmed) {
        acceptProposal(proposalState);
        Swal.fire({
          title: '¡Felicitaciones!',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "¡Genial!",
          html: "Aceptaste la propuesta. <p>El trabajador sera notificado.</p> <p>Te enviaremos un mail si el confirma el trabajo.</p>",
          icon: "success"
        })
      }
    })
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
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/home')
          }
        })
      }
    });
  };

  
  return (
    <div className="Detail_Proposal">
      {edition && (
        <div className="Detail_divModal">
          <FormEditProposal
            close={handleCloseEdition}
            proposal={proposalById}
          />
        </div>
      )}
      <div className="DetailP_CardHeader">
        <p className="DetailP_UserName">{props.userWorker?.name}</p>
        <p className="DetailP_remuneration">{`Presupuesto ARS $${props?.remuneration}`}</p>
      </div>
      <p className="DetailP_propuestaUser">{props?.proposal_description}</p>
      <div>
        <p className="DetailP_timeUser">{`Tiempo estimado de entrega: `}<span className="DetailP_timeData">{props?.worked_time}</span> </p>
        <div className="DetailP_divButton">
          {props?.isActive === false ?
            <p className="Detail_cancelled">CANCELADA</p>
          :
          offer.userClientId === currentUser.id && props.state === "posted" && proposalAccepted === undefined ? (
            <button name="button" className="Detail_buttonAccept" onClick={handleClick}>
              Aceptar
            </button>
          ) : null}
          {props.userWorker.id === currentUser.id &&
            currentUser.isPremium === true &&
            props.state === "posted" ? (
            <button
              name="button"
              className="DetailP_buttonEdit"
              onClick={handleEdition}
            >
              Editar
            </button>
          ) : null}
          {props.userWorker.id === currentUser.id &&
            props.state === "posted" ? (
            <button
              name="button"
              className="DetailP_buttonCancel"
              onClick={() => handleCancelation(props?.idProposal)}
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardProposal;
