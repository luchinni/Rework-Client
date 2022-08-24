import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../../images/logo_header.png"
import logo_premium from "../../../images/logo_header_premium.png"
import Header from '../../Header/Header'
import "./SeleccionPremium.css"

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
        <h1>¡Actualiza tu cuenta y accede a mas beneficios!</h1>
        <div className='Premium_cont'>
        <div className='Premium_each_cont'>
            <h2>Cuenta gratuita</h2>
            <img src={logo} alt="" />
            <ul className='Premium_ul'>
                <li><p>• Publica hasta 15 propuestas por semana.</p></li>
                <li><p>• Recibe el pago en un plazo de 15 a 30 dias al finalizar tus trabajos.</p></li>
                <li><p>• Compite a ciegas contra otros trabajadores por el puesto.</p></li>
            </ul>
            <button className="CR_inputSubmit" onClick={freeAcount}>Continuar gratis</button>
        </div>
        <div className='Premium_each_cont'>
            <h2>Cuenta Premium</h2>
            <img src={logo_premium} alt="" />
            <ul className='Premium_ul'>
                <li><p>• Publica hasta 30 propuestas por semana.</p></li>
                <li><p>• Recibe el pago en un plazo de 5 a 10 dias al finalizar tus trabajos.</p></li>
                <li><p>• Revisa las propuestas de tus competidores y compite con ventaja.</p></li>
            </ul>
            <button className="CR_inputSubmit" onClick={premiumAcount}>Actualizar a premium</button>
        </div>
        </div>
        
    </div>
    </div>
  )
}

export default SeleccionPremium