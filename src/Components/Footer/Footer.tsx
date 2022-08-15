import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoHenry from '../../images/logo_henry.png'

function Footer() {
  return (
    <footer className='Footer_component'>
      <div className='Footer_contentDiv'>
        <div className='Footer_top'>
          <span className='footer_logo'>RE<span className='footer_work'>work</span></span>
        </div>

        <div className='Footer_bottom'>
          <div className='Footer_buttonContainerDivs'>
            <div>
              <h2 className='Footer_titleLinks'>PROYECTO</h2>
              <div className='Footer_divLinks'>
                <Link to="#" className='Footer_link'>devs</Link>
                <a href="https://github.com/The-final-pg" target="_blank" className='Footer_link'>repositorio</a>
                <a href="https://www.figma.com/file/pf1okewD3QyTBWvQhedJv6/Untitled" target="_blank" className='Footer_link'>diseño</a>
              </div>
            </div>
            <div>
              <h2 className='Footer_titleLinks'>ENLACES DE AYUDA</h2>
              <div className='Footer_divLinks'>
                <Link to="#" className='Footer_link'>centro de ayuda</Link>
                <Link to="#" className='Footer_link'>politicas de privacidad</Link>
                <Link to="#" className='Footer_link'>terminos y condiciones</Link>
              </div>
            </div>
            {/* <div>
              <h2 className='Footer_titleLinks'>ENLACES</h2>
              <div className='Footer_divLinks'>
                <Link to="/home" className='Footer_link'>home</Link>
              </div>
            </div> */}
          </div>
          <div className='Footer_divLogoHenry'>
            <a className='Footer_linkLogoHenry' href="https://www.soyhenry.com/" target="_blanck">
              <img src={logoHenry} alt="henry" />
            </a>
          </div>
        </div>

      </div>

      <div className='Final_Div'>
        <span className='Final_text'>Proyecto final ©2022</span>
      </div>
    </footer>
  )
}

export default Footer
