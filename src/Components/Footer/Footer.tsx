import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logoHenry from '../../images/logo_henry.png';
import logo from '../../images/logo_footer.png';

function Footer() {
  return (
    <footer className='Footer_component'>
      <div className='Footer_contentDiv'>
        <div className='Footer_top'>
        </div>

        <div className='Footer_bottom'>
          <div className='Footer_buttonContainerDivs'>
            <div>
              <h2 className='Footer_titleLinks'>PROYECTO</h2>
              <div className='Footer_divLinks'>
                <a href="https://re-work-ten.vercel.app/developers" target="_blank" className='Footer_link'>Devs</a>
                <a href="https://github.com/The-final-pg" target="_blank" className='Footer_link'>Repositorio</a>
                <a href="https://www.figma.com/file/pf1okewD3QyTBWvQhedJv6/Untitled" target="_blank" className='Footer_link'>Diseño</a>
              </div>
            </div>
            <div>
              <h2 className='Footer_titleLinks'>ENLACES DE AYUDA</h2>
              <div className='Footer_divLinks'>
                <Link to="#" className='Footer_link'>Centro de ayuda</Link>
                <Link to="#" className='Footer_link'>Políticas de privacidad</Link>
                <Link to="#" className='Footer_link'>Términos y condiciones</Link>
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
        <img className='logo_img' src={logo} alt="REwork" />
          </div>
        </div>

      </div>

      <div className='Final_Div'>
        <span className='Final_text'> © 2022 REwork, todos los derechos reservados.</span>
      </div>
    </footer>
  )
}

export default Footer
