import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../../images/logo_header.png"
import logo_premium from "../../../images/logo_header_premium.png"
import Header from '../../Header/Header'
import "./SeleccionPremium.css"
import {GiCheckMark} from "react-icons/gi"


const SeleccionPremium = () => {

    const navigate = useNavigate();

    const freeAcount = () => {
        navigate("/home")
    }

    const premiumAcount = () => {
        navigate("/premium/payment")
    }
  return (
    <div>
        <Header></Header>
        <div className='Premium_all_cont'>
        <h1><b>¡Actualiza tu cuenta y a</b>ccede a mas beneficios!</h1>
        <div className='Premium_cont'>
        <div className='Premium_each_cont'>
            <h2>Cuenta gratuita</h2>
            <img className='free_image' src={logo} alt="" />
            <ul className='Premium_ul'>
                <li><p><GiCheckMark className='check_icon'/> Recibe el pago en un plazo de 5 a 10 dias al finalizar tus trabajos.</p></li>
                <br />
                <li><p><GiCheckMark className='check_icon'/> Compite a ciegas contra otros trabajadores por el puesto.</p></li>
                <br />
                <li><p><GiCheckMark className='check_icon'/> Envia propuestas una unica vez por oferta.</p></li>
            </ul>
            <button className="Submit_button_premium" onClick={freeAcount}>Continuar gratis</button>
        </div>
        <div className='Premium_each_cont'>
            <h2>Cuenta Premium</h2>
            <div className='Premium_topBox'>
                <img className='Premium_image' src={logo_premium} alt="" />
            </div>
            <ul className='Premium_ul'>
                <li><p><GiCheckMark className='check_icon'/> Recibe el pago en un plazo de 72hs máximo al finalizar tus trabajos.</p></li>
                <br />
                <li><p><GiCheckMark className='check_icon'/> Revisa las propuestas de tus competidores y compite con ventaja.</p></li>
                <br />
                <li><p><GiCheckMark className='check_icon'/> Edita tus propuestas y mejora tus posibilidades</p></li>
            </ul>
            <button className="Submit_button_premium" onClick={premiumAcount}>Actualizar a premium</button>
        </div>
        </div>
        
    </div>
    </div>
  )
}

export default SeleccionPremium