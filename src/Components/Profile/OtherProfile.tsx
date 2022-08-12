import React from 'react'
import Header from '../Header/Header';
import OtherPortfolio from './Portfolio/OtherPorfolio';
import CardsReview from '../Reviews/CardsReview/CardsReview';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdOther } from '../../Redux/Reducer/reducer';

const OtherProfile = () => {

    const user = useSelector((state:any) => state.workService.userById);

    const dispatch = useDispatch();
    const params = useParams();

    console.log('params: ', params)
    console.log('user: ', user)

    useEffect(() => {
         dispatch(getUserByIdOther(params.id));
      }, [dispatch])

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
    
            <div>
              <h3>Descripción:</h3>
            </div>
    
            <div className='Profile_divTags'>
              <button className='Profile_tag'>Porfolio</button>
              <button className='Profile_tag'>Informacion</button>
              <button className='Profile_tag'>Reviews</button>
            </div>
    
            <div className='Profile_divPortfolio'>
              <OtherPortfolio/>
            </div>
    
          </div>
          <CardsReview/>
        </div>
      )
    }

export default OtherProfile