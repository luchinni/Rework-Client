import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import bannerUnoHome from '../../../images/bannerUno_home.png';
import bannerDosHome from '../../../images/bannerDos_home.jpg';
import bannerTresHome from "../../../images/bannerTres_home.jpg"
import './Banner.css'

function Banner() {

  const currentUser = useSelector((state:any) => state.workService.currentUser);
  const userLogged = useSelector((state: any) => state.workService.userLogged)
  console.log(userLogged);
  return (
    <div className='Banner_component'>
      <div className='Banner_Carrusel'>
        {currentUser.id===""? 
        <div className='Banner_divBanner'>
          <p className='Banner_imageTextUno'>MAS DE MIL FREELANCERS Y OFERTAS <b>ESPERANDOTE</b></p>
          <img className='Banner_image' src={bannerTresHome} alt="banner"/>
        </div>
        :userLogged.isWorker===true?
        <div className='Banner_divBanner'>
          <p className='Banner_imageTextTres'>LAS MEJORES OFERTAS A TU DISPOSICION</p>
          <img className='Banner_image' src={bannerUnoHome} alt="banner" />
        </div>
        :
        <div className='Banner_divBannerDos'>
          <p className='Banner_imageTextDos'>LOS MEJORES PROFESIONALES A TU DISPOSICION</p>
          <img className='Banner_image' src={bannerDosHome} alt="banner" />
        </div>
        
        }
      </div>
    </div>
  )
}

export default Banner