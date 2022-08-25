import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { checkSession } from '../../../Redux/Reducer/reducer';
import Header from '../../Header/Header';
import "./Pending.css"

const Pending = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const currentUser = useSelector((state:any) => state.workService.currentUser);
  useEffect(() => {
    dispatch(checkSession())
  }, [])
  const goHome = () => {
    navigate("/home")
}
  return (
    <div>
      <Header/>
      <div className="pending_cont">
        <div className='pending_display'>
          <h1>Tu pago esta pendiente</h1>
          <h2>Tuvimos problemas para procesar tu pago</h2>
          <h3>Estamos intentando procesar tu pago, esto puede demorar te enviaremos un mail con el resultado.</h3>
          <button className='succes_back' onClick={goHome}>Volver al sitio</button>
        </div>    
      </div>
    </div>
  )
}

export default Pending