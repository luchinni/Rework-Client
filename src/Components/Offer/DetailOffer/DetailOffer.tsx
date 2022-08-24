import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  checkSession,
  getOfferId,
  stateCancelledOfferPost,
  isActiveFalseOfferPost,
} from "../../../Redux/Reducer/reducer";
import Header from "../../Header/Header";
import copy from "../../../images/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import FormProposal from "../../proposals/FormProposal/FormProposal";
import CardsProposal from "../../proposals/CardsProposal/CardsProposal";
import "./DetailOffer.css";
import { useParams } from "react-router-dom";
import OwnProposal from "../../proposals/OwnProposal/OwnProposal";
import Swal from "sweetalert2";
import FormReview from "../../Reviews/FormReview/FormReview";

const DetailOffer = () => {
  const offerId = useSelector((state: any) => state.workService.offerById);
  const currentUser = useSelector(
    (state: any) => state.workService.currentUser
  );
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getOfferId(params.id));
    dispatch(checkSession());
  }, [dispatch]);

  const [open, setOpen] = useState(false);
 /*  const propoHired = offerId?.proposals.filter((p:any) => p.state === "contract acepted")

  const filtredOffer = {
    ...offerId,
    proposals: propoHired
  } */


  function handleOpen() {
    setOpen(true);
  }

  function handleClose(value: any) {
    setOpen(value);
  }

  const [openReview, setOpenReview] = useState(false)

  function OpenModalReview(){
    setOpenReview(true);
  }

  function CloseModalReview(){
    setOpenReview(false);
  }

  function handleDelete(id: string) {
    Swal.fire({
      title: "¿Estás seguro que quieres eliminar tu publicación?",
      text: "No podrás revertir el cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Confirmar",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        stateCancelledOfferPost(id);
        isActiveFalseOfferPost(id);
        Swal.fire({
          title: "¡Eliminada!",
          text: "Tu publicación fue eliminada.",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "¡Listo!",
        });
      }
    });
  }

  let alreadyApply: boolean = false;

  const proposalAccepted = offerId?.proposals?.find((p:any) => p.state === 'accepted')
  const contractAccepted = offerId?.proposals?.find((p:any) => p.state === 'contract accepted')
  const contractStarted = offerId?.proposals?.find((p:any) => p.state === 'contract started')
  const proposalFinalized = offerId?.proposals?.find((p:any) => p.state === 'finalized')

  console.log("la ofer",proposalFinalized)
  const filtred: any = offerId.proposals?.filter(
    (p: any) => p.userWorker?.id === currentUser?.id && p.isActive === true
  );

  if (filtred?.length > 0) {
    alreadyApply = true;
  } else {
    alreadyApply = false;
  }

  return (
    <div className={open ? "Detail_component modalOpen" : "Detail_component"}>
      <Header />

      {open && (
        <div className="Detail_divModal">
          <FormProposal idOferta={offerId.idOffer} close={handleClose} />
        </div>
      )}

      <div className={open ? "Detail_detail open" : "Detail_detail"}>
        <div>
          <div className="Detail_User">
            <div className="Detail_divUserImage">
              <img
                className="Detail_userPhoto"
                src={offerId.userClient?.photo}
                alt="fotito"
                loading="lazy"
              />
            </div>
            <Link
              to={`/profile/${offerId.userClientId}`}
              className="Detail_NameUserPost"
            >
              {offerId.userClient?.name} {offerId.userClient?.lastName}
            </Link>
            <p className="Detail_UserRating">
              Rating:  <span>{offerId.userClient?.rating}</span>
            </p>
            <p className="Detail_offersCount">
              Publicaciones: <span>{offerId?.offersCount}</span>
            </p>
            <div>
              <div className="Detail_urlCopy">
                <div className="Detail_divUrl">
                  <span className="Detail_url">¡Copia el enlace!</span>
                </div>
                <div className="Detail_divCopy">
                  <CopyToClipboard text={window.location.href}>
                    <button
                      onClick={() =>
                        toast.success("Copiado", { position: "top-right" })
                      }
                      className="Detail_buttonCopy"
                    >
                      <img className="Detail_Copy" src={copy} alt="copy" />
                    </button>
                  </CopyToClipboard>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Detail_infoProposal">
          <div className="Detail_offer">
            <div className="Detail_header">
              <h2 className="Detail_title">{offerId?.title}</h2>
              <div className="Detail_timeRemu">
                <p className="Detail_time">{`Tiempo aproximado del trabajo: ${offerId?.work_duration_time}`}</p>
                <p className="Detail_remuneration">{`Paga estimada ARS: ${offerId.min_remuneration} - ${offerId.max_remuneration}`}</p>
              </div>
            </div>
            <div className="Detail_tags">
            {offerId.profession?.map((prof: any) => <p className="Detail_tag">{prof}</p> )}
            </div>
            <div className="Detail_tagImage">
              <div className="Detail_descriptionCont">
                <p className="Detail_description">{offerId?.offer_description}</p>
              </div>
              <div className="Detail_divImages">
              <img
                className="Detail_images"
                src={offerId?.photo}
                alt="fotito offer"
                loading="lazy"
              />
              </div>
            </div>

            {alreadyApply === false && currentUser.isWorker === true ? (
              <button className="Detail_buttonAccept" onClick={handleOpen}>
                Aplicar
              </button>
            ) : (
              null
            )}
            {currentUser?.id === offerId.userClientId &&
            offerId.isActive === true &&
            offerId.state === "active" &&
            proposalAccepted === undefined &&
            proposalFinalized === undefined &&
            contractAccepted === undefined &&
            contractStarted === undefined
            ? (
              <button
                className="Detail_buttonDelete"
                onClick={() => handleDelete(offerId.idOffer)}
              >
                Eliminar
              </button>
            ) : (
              null
            )}
          {openReview && 
            <div className="div_formReview">
              <FormReview offer={offerId} close={CloseModalReview} />
            </div>
          }
          { (currentUser?.isWorker === false && proposalFinalized !== undefined && offerId?.state === 'contract started' && offerId.userClient?.id === currentUser?.id)
            ||
            (currentUser?.isWorker === true && contractStarted !== undefined && offerId?.state === 'contract started' && contractStarted?.userWorkerId === currentUser?.id)
           ? 
            <button className="Detail_buttonFinish" onClick={OpenModalReview}>Trabajo finalizado</button>
            :
            null
          }

          </div>
        </div>
      </div>
      { 
        /* offerId.userClientId === currentUser.id && offerId.state === "contract started" ?

        
          <div>
            <h2 className="Detail_h2Propuestas">propuestas</h2>
            <CardsProposal offer={offerId} />
          </div>
        : */
        //si la offer es del client logeado actualmente, o el user actual es admin o premium
        offerId.userClientId === currentUser.id ||
        currentUser.isAdmin === true ||
        currentUser.isPremium === true ? (
          //renderiza las cards completas
          <div>
            <h2 className="Detail_h2Propuestas">Propuestas</h2>
            <CardsProposal offer={offerId} />
          </div>
        ) : //si el usuario es worker pero no premium, que le renderice su propuesta enviada
        currentUser.isPremium === false && currentUser.isWorker === true ? (
          <div className="Detail_divCardPropuestas">
            <OwnProposal offer={offerId} idWorker={currentUser.id} />
            <div className="Detail_premiumCont">
              <div className="Detail_premiumBack">
              </div>
              <div className="Detail_premium">
                <span>¿Quieres ver las propuestas de otros freelancers?</span>
                <p>¡conviértete en Premium!</p> 
                <button className="Detail_premiumButton">
                  Hazte Premium
                </button>
              </div>
            </div>
          </div>
        ) : (
          //la opcion que queda es que sea un user client
          <br />
        )
      }
    </div>
  );
};

export default DetailOffer;
