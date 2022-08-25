import React from 'react'
import Header from '../Header/Header';
import OtherPortfolio from './Portfolio/OtherPorfolio';
import Information from './Information/Information';
import Reviews from './Reviews/Reviews';
import CardsReview from '../Reviews/CardsReview/CardsReview';
import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeLoading, getUserByIdOther } from '../../Redux/Reducer/reducer';
import { ratingStars } from "../WorkerHome/CardWorker/CardWorker";
import Loading from '../Loading/Loading';

const OtherProfile = () => {

    const user = useSelector((state:any) => state.workService.userById);
    console.log("info del user: ", user)
    const dispatch = useDispatch();
    const params = useParams();
  const isLoading = useSelector((state:any) => state.workService.isLoading);


    useEffect(() => {
         dispatch(getUserByIdOther(params.id));
         dispatch(changeLoading(true))
    setTimeout(() => dispatch(changeLoading(false)), 1700);
      }, [dispatch])

      const [portfolioOpen, setPortfolioOpen] = useState(false);
      const [informationOpen, setInformationOpen] = useState(true);
      const [reviewsOpen, setReviewsOpen] = useState(false);
    
      function handlePort() {
        setPortfolioOpen(true)
        setInformationOpen(false)
        setReviewsOpen(false)
      }
    
      function handleInfo() {
        setInformationOpen(true)
        setPortfolioOpen(false)
        setReviewsOpen(false)
      }
    
      function handleRevi() {
        setReviewsOpen(true)
        setPortfolioOpen(false)
        setInformationOpen(false)
      }

    return (
        <>
        {isLoading ? <Loading/>: 
        <>
        <div className='Profile_Component'>
          <Header/>
          <div className='Profile'>
            <div className='Profile_topPerfil'>
              <div className='Profile_divPortada'>
                <img className='Profile_portada' src="https://raw.githubusercontent.com/The-final-pg/.github/main/profile/REwork.jpg" alt="Portada" />
              </div>
              
              <div>
    
                <div className='Profile_DivCont'>
                  <div className='Profile_divDivProfile'>
                    <div className='Profile_divFotoPerfil'>
                      <img className='Profile_foto' src={user.photo} alt="profile" />
                    </div>
                    <div className='Profile_divNameAndRating'>
                      <span className='Profile_UserName'>{user?.name}</span>
                      <span className='Profile_UserRating'>Rating: {user.rating ? ratingStars(user.rating) : ratingStars(0)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <div className='Profile_divTags'>
              <button className={informationOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handleInfo}>Informacion</button>
              {   user?.isWorker ?
                         <button className={portfolioOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handlePort}>Porfolio</button>
                         : false
}
              <button className={reviewsOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handleRevi}>Reviews</button>
            </div>
    

        { portfolioOpen ? 
          <div className='Profile_divPortfolio'>
            <OtherPortfolio/>
          </div>
          : false
        }


        { informationOpen ? 
          <div className='Profile_divPortfolio'>
      
             <Information props={user}/> 
          </div>
          : false
        }

        {
          reviewsOpen ?
          <div className='Profile_divPortfolio'>
            <Reviews />
          </div>
          : false
        }
    
          </div>
          <CardsReview/>
        </div>
        </>
        }         
     </>
      )
    }

export default OtherProfile
