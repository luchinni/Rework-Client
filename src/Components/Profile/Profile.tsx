import React from 'react'
import Header from '../Header/Header'
import './Profile.css'

function Profile() {
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
                  <img className='Profile_foto' src="https://i.ytimg.com/vi/hjk4nLDxNAs/hqdefault.jpg" alt="" />
                </div>
                <div className='Profile_divNameAndRating'>
                  <span className='Profile_UserName'>Esteban Longo</span>
                  <span className='Profile_UserRating'>Rating 3.7</span>
                </div>
              </div>

              <div>
                <button className='Profile_editProfile'>Editar perfil</button>
              </div>
            </div>
          </div>
        </div>

        <div className='Profile_divTags'>
          <button className='Profile_tag'>Porfolio</button>
          <button className='Profile_tag'>Informacion</button>
          <button className='Profile_tag'>Revies</button>
        </div>

        <div className='Profile_divPortfolio'>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
          <div className='Profile_portfolio'></div>
        </div>

      </div>
    </div>
  )
}

export default Profile