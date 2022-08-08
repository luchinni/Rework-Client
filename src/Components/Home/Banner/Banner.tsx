import React from 'react'
import bannerHome from '../../../images/banner_home.png';
import './Banner.css'

function Banner() {
  return (
    <div className='Banner_component'>
      <div className='Banner_divBanner'>
        <p className='Banner_imageText'>LOS MEJORES FREELANCERS A TU DISPOSICION</p>
        <img className='Banner_image' src={bannerHome} alt="banner" />
      </div>
    </div>
  )
}

export default Banner