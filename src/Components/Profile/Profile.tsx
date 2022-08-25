import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeLoading,
  checkSession,
  getOffers,
  getUserById,
} from "../../Redux/Reducer/reducer";
import Header from "../Header/Header";
import CardsReview from "../Reviews/CardsReview/CardsReview";
import decode from "jwt-decode";
import Portfolio from "./Portfolio/Portfolio";
import Information from "./Information/Information";
import "./Profile.css";
import Reviews from "./Reviews/Reviews";
import Historial from "./Historial/Historial";
import FormEditProfileClient from "./Edit Profile/FormEditProfileClient";
import FormEditProfileWorker from "./Edit Profile/FormEditProfileWorker";
import { ratingStars } from "../WorkerHome/CardWorker/CardWorker";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function Profile() {
  const dispatch = useDispatch();
  const token: any = localStorage.getItem("token");
  const tokenDecode: any = decode(token);
  const isLoading = useSelector((state:any) => state.workService.isLoading);


  useEffect(() => {
    dispatch(getUserById(tokenDecode));
    dispatch(getOffers());
    dispatch(checkSession());
    dispatch(changeLoading(true))
    setTimeout(() => dispatch(changeLoading(false)), 1700);
  }, []);

  //const users = useSelector((state: any) => state.workService.offers)

  const currentUser = useSelector(
    (state: any) => state.workService.currentUser
  );
  // console.log('current' , currentUser)
  const userLogged = useSelector((state: any) => state.workService.userLogged);
  const navigate = useNavigate();
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [informationOpen, setInformationOpen] = useState(true);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [historialOpen, setHistorialOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  function handlePort() {
    setPortfolioOpen(true);
    setInformationOpen(false);
    setReviewsOpen(false);
    setHistorialOpen(false);
  }

  function handleInfo() {
    setInformationOpen(true);
    setPortfolioOpen(false);
    setReviewsOpen(false);
    setHistorialOpen(false);
  }

  function handleRevi() {
    setReviewsOpen(true);
    setPortfolioOpen(false);
    setInformationOpen(false);
    setHistorialOpen(false);
  }

  function handleHist() {
    setHistorialOpen(true);
    setReviewsOpen(false);
    setPortfolioOpen(false);
    setInformationOpen(false);
  }

  function goPremium(){
    navigate("/premium")
  }

  function handleUpdate() {
    setEditOpen(true);
  }

  function UpdateClose(value: any) {
    setEditOpen(value);
  }

  // useEffect(() => {
  //   handlePort()
  // })

  return (
    <>
    {isLoading ? <Loading/>: 
    <>
    
    <div className="Profile_Component">
      <Header />
      <div className="Profile">
        <div className="Profile_topPerfil">
          <div className="Profile_divPortada">
            <img
              className="Profile_portada"
              src="https://github.com/The-final-pg/.github/blob/main/profile/REwork.jpg?raw=true"
              alt="Portada"
            />
          </div>

          <div>
            <div>
              {editOpen && (
                <div className="Profile_divModalUpdate">
                  {currentUser.isWorker === false ? (
                    <div className="Profile_divModalUpdate_Cli">
                      <FormEditProfileClient props={UpdateClose} />
                    </div>
                  ) : (
                    <div className="Profile_divModalUpdate_Worker">
                      <FormEditProfileWorker props={UpdateClose} />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="Profile_DivCont">
              <div className="Profile_divDivProfile">
                <div className="Profile_divFotoPerfil">
                  <img
                    className="Profile_foto"
                    src={userLogged?.photo}
                    alt="profile"
                  />
                </div>

                {/* <div className="Profile_divNameAndRating"> */}
                {/* <span className="Profile_UserName">{userLogged.name}</span>
                  <span className="Profile_UserRating">
                    Rating: {userLogged.rating ? userLogged.rating : 0}
                  </span> */}

                <div className="Profile_divNameAndRating">
                  <span className="Profile_UserName">
                    {userLogged?.name} {userLogged?.lastName}{" "}
                  </span>
                  <span className="Profile_UserRating">
                    <span>Rating: </span>{userLogged?.rating ? ratingStars(userLogged.rating) : ratingStars(0)}
                  </span>
                </div>
                {/* </div> */}

                <div className="Profile_buttonDiv">
                  <div>
                  {currentUser?.isPremium === false  && currentUser?.isWorker === true ?
                  <button
                      className="Profile_premiumButton"
                      onClick={() => goPremium()}
                    >
                      Hazte Premium
                    </button>
                    : null
                  }
                  </div> 
                  <div>
                    <button className="Profile_editProfile" onClick={() => handleUpdate()}>
                      Editar perfil
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {currentUser?.isWorker === true ? (
            <div className="Profile_divTags">
              <button
                className={informationOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handleInfo}
              >
                Información
              </button>
              <button
                className={portfolioOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handlePort}
              >
                Portfolio
              </button>
              <button
                className={reviewsOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handleRevi}
              >
                Reviews
              </button>
              <button
                className={historialOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handleHist}
              >
                Historial
              </button>
            </div>
          ) : (
            <div className="Profile_divTags">
              <button
                className={informationOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handleInfo}
              >
                Información
              </button>
              <button
                className={reviewsOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handleRevi}
              >
                Reviews
              </button>
              <button
                className={historialOpen ? "Profile_tag open" : "Profile_tag"}
                onClick={handleHist}
              >
                Historial
              </button>
            </div>
          )}

          {/* <div className="Profile_divTags">
          <button
            className={portfolioOpen ? "Profile_tag open" : "Profile_tag"}
            onClick={handlePort}
          >
            Porfolio
          </button>
          <button
            className={informationOpen ? "Profile_tag open" : "Profile_tag"}
            onClick={handleInfo}
          >
            Informacion
          </button>
          <button
            className={reviewsOpen ? "Profile_tag open" : "Profile_tag"}
            onClick={handleRevi}
          >
            Reviews
          </button>
          <button
            className={historialOpen ? "Profile_tag open" : "Profile_tag"}
            onClick={handleHist}
          >
            Historial
          </button>
        </div> */}

          {portfolioOpen && currentUser?.isWorker === true ? (
            <div className="Profile_divPortfolio">
              <Portfolio />
            </div>
          ) : (
            false
          )}

          {informationOpen ? (
            <div className="Profile_divPortfolio">
              <Information props={userLogged} />
            </div>
          ) : (
            false
          )}

          {reviewsOpen ? (
            <div className="Profile_divPortfolio">
              <Reviews user={currentUser.id} />
            </div>
          ) : (
            false
          )}

          {historialOpen ? (
            <div className="Profile_divPortfolio">
              <Historial />
            </div>
          ) : (
            false
          )}
        </div>
        <CardsReview />
      </div>
    </div>
    </>
    }
    </>
  );
}

export default Profile;

function state(state: any, arg1: (any: unknown) => any) {
  throw new Error("Function not implemented.");
}
