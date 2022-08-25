import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import logo from "../../../images/logo_header.png"
import logo_premium from "../../../images/logo_header_premium.png"
import { changeLoading } from '../../../Redux/Reducer/reducer'
import Header from '../../Header/Header'
import Loading from '../../Loading/Loading'
import "./SeleccionPremium.css"

const SeleccionPremium = () => {

    const isLoading = useSelector((state:any) => state.workService.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeLoading(true))
        setTimeout(() => dispatch(changeLoading(false)), 1700);
    },[]);

    const navigate = useNavigate();

    const freeAcount = () => {
        navigate("/home")
    }

    const premiumAcount = () => {
        navigate("/premium/payment")
    }
  return (
    <>
    {isLoading ? <Loading/>:
    <>
    <div>
        <Header></Header>
        <div className='Premium_all_cont'>
        <h1>¡Actualiza tu cuenta y accede a más beneficios!</h1>
        <div className='Premium_cont'>
        <div className='Premium_each_cont'>
            <h2>Cuenta gratuita</h2>
            <img src={logo} alt="" />
            <ul className='Premium_ul'>
                <li><p> Recibe el pago en un plazo de 5 a 10 días al finalizar tus trabajos.</p></li>
                <li><p> Compite a ciegas contra otros trabajadores por el puesto.</p></li>
                <li><p> Envía propuestas una única vez por oferta.</p></li>
            </ul>
            <button className="CR_inputSubmit" onClick={freeAcount}>Continuar gratis</button>
        </div>
        <div className='Premium_each_cont'>
            <h2>Cuenta Premium</h2>
            <div className='Premium_topBox'>
                <img src={logo_premium} alt="" />
            </div>
            <ul className='Premium_ul'>
                <li><p> Recibe el pago en un plazo de 72hs máximo al finalizar tus trabajos.</p></li>
                <li><p> Revisa las propuestas de tus competidores y compite con ventaja.</p></li>
                <li><p> Edita tus propuestas y mejora tus posibilidades.</p></li>
            </ul>
            <button className="CR_inputSubmit" onClick={premiumAcount}>Actualizar a premium</button>
        </div>
        </div>
        
    </div>
    </div>
    </>
    }
    </>
  )
}

export default SeleccionPremium
