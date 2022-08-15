import React from 'react'
import Header from '../Header/Header';
import OtherPortfolio from './Portfolio/OtherPorfolio';
import CardsReview from '../Reviews/CardsReview/CardsReview';
import { useParams } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdOther } from '../../Redux/Reducer/reducer';

const OtherProfile = () => {

    const user = useSelector((state:any) => state.workService.userById);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
         dispatch(getUserByIdOther(params.id));
      }, [dispatch])

      const [portfolioOpen, setPortfolioOpen] = useState(true);
      const [informationOpen, setInformationOpen] = useState(false);
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
                      <img className='Profile_foto' src="https://th.bing.com/th/id/R.3fe29c6b3058f48e53e86c9cb687c27f?rik=6eP5XRKYF2C2%2bw&pid=ImgRaw&r=0" alt="profile" />
                    </div>
                    <div className='Profile_divNameAndRating'>
                      <span className='Profile_UserName'>{user?.name}</span>
                      <span className='Profile_UserRating'>Rating: {user.rating?user.rating:0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
            <div className='Profile_divTags'>
              <button className={portfolioOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handlePort}>Porfolio</button>
              <button className={informationOpen ? 'Profile_tag open' : 'Profile_tag'} onClick={handleInfo}>Informacion</button>
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
            information
          </div>
          : false
        }

        {
          reviewsOpen ?
          <div className='Profile_divPortfolio'>
            reviews
          </div>
          : false
        }
    
          </div>
          <CardsReview/>
        </div>
      )
    }

export default OtherProfile