import React from 'react'
import bannerUnoHome from '../../../images/bannerUno_home.png';
import bannerDosHome from '../../../images/bannerDos_home.jpg';
import './Banner.css'

function Banner() {
  return (
    <div className='Banner_component'>
      <div className='Banner_Carrusel'>

        <div className='Banner_divBanner'>
          <p className='Banner_imageText'>LOS MEJORES FREELANCERS A TU DISPOSICION</p>
          <img className='Banner_image' src={bannerUnoHome} alt="banner" />
        </div>

        <div className='Banner_divBannerDos'>
          <p className='Banner_imageTextDos'>LOS MEJORES FREELANCERS A TU DISPOSICION</p>
          <img className='Banner_image' src={bannerDosHome} alt="banner" />
        </div>

      </div>
    </div>
  )
}

export default Banner