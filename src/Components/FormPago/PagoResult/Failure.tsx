import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkSession } from '../../../Redux/Reducer/reducer';
import Header from '../../Header/Header';
import "./Failure.css"

const Failure = () => {
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
      <div className="failure_cont">
        <div className='failure_display'>
          <h1>Tu pago fue rechazado</h1>
          <h2>Por favor, revisa tus datos e intentalo de nuevo.</h2>
          <button className='succes_back' onClick={goHome}>Volver al sitio</button>
        </div>
      </div>
    </div>
  )
}

export default Failure