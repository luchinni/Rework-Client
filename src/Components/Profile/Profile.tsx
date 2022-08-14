import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkSession, getOffers, getUserById } from '../../Redux/Reducer/reducer';
import Header from '../Header/Header';
import CardsReview from '../Reviews/CardsReview/CardsReview';
import decode from "jwt-decode"
import Portfolio from './Portfolio/Portfolio';
import Information from './Information/Information';
import './Profile.css'
import Reviews from './Reviews/Reviews';
import Historial from './Historial/Historial';

function Profile() {

  const dispatch = useDispatch();
  const token:any = localStorage.getItem("token")
  const tokenDecode:any = decode(token)

  useEffect(() => {
    dispatch(getUserById(tokenDecode))
    dispatch(getOffers());
    dispatch(checkSession())
  },[])

  //const users = useSelector((state: any) => state.workService.offers)
  // const currentUser = useSelector((state:any) => state.workService.currentUser)
  // console.log('current' , currentUser)
  const userLogged = useSelector((state: any) => state.workService.userLogged)
  // console.log('loged', userLogged)

  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [informationOpen, setInformationOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [historialOpen, setHistorialOpen] = useState(false);

  function handlePort() {
    setPortfolioOpen(true)
    setInformationOpen(false)
    setReviewsOpen(false)
    setHistorialOpen(false)
  }

  function handleInfo() {
    setInformationOpen(true)
    setPortfolioOpen(false)
    setReviewsOpen(false)
    setHistorialOpen(false)
  }

  function handleRevi() {
    setReviewsOpen(true)
    setPortfolioOpen(false)
    setInformationOpen(false)
    setHistorialOpen(false)
  }

  function handleHist() {
    setHistorialOpen(true)
    setReviewsOpen(false)
    setPortfolioOpen(false)
    setInformationOpen(false)
  }

  // useEffect(() => {
  //   handlePort()
  // })

  return (
    <div className='Profile_Component'>
      <Header/>
      <div className='Profile'>
        <div className='Profile_topPerfil'>
          <div className='Profile_divPortada'>
            <img className='Profile_portada' src="https://th.bing.com/th/id/R.99068920ab82a672b048b73e1b1d5374?rik=pvNRgNW6hzVcKw&pid=ImgRaw&r=0" alt="Portada" />
          </div>
          
          <div>

            <div className='Profile_DivCont'>
              <div className='Profile_divDivProfile'>
                <div className='Profile_divFotoPerfil'>
                  <img className='Profile_foto' src={userLogged?.photo} alt="profile" />
                </div>
                <div className='Profile_divNameAndRating'>
                  <span className='Profile_UserName'>{userLogged.name}</span>
                  <span className='Profile_UserRating'>Rating: {userLogged.rating?userLogged.rating:0}</span>
                </div>
              </div>

              <div>
                <button className='Profile_editProfile'>Editar perfil</button>
              </div>
            </div>
          </div>
        </div>

        {/* <div>
          <h3>Descripción:</h3>
        </div> */}

        <div className='Profile_divTags'>
          <button className={portfolioOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handlePort}>Porfolio</button>
          <button className={informationOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handleInfo}>Informacion</button>
          <button className={reviewsOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handleRevi}>Reviews</button>
          <button className={historialOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handleHist}>Historial</button>
        </div>


        { portfolioOpen ? 
          <div className='Profile_divPortfolio'>
            <Portfolio/>
          </div>
          : false
        }


        { informationOpen ? 
          <div className='Profile_divPortfolio'>
            <Information/>
          </div>
          : false
        }

        {
          reviewsOpen ?
          <div className='Profile_divPortfolio'>
            <Reviews/>
          </div>
          : false
        }

        {
          historialOpen ?
          <div className='Profile_divPortfolio'>
            <Historial/>
          </div>
          : false
        }

      </div>
      <CardsReview/>
    </div>
  )
}

export default Profile

function state(state: any, arg1: (any: unknown) => any) {
  throw new Error('Function not implemented.')
}
