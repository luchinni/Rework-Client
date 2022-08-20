/* import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'; */
import HeaderRegister from '../Register/HeaderRegister/HeaderRegister';
import imageClient from "../../images/Online report_Isometric (1).png"
import imageWorker from "../../images/Money_motivation _Flatline.png"
import { useDispatch, useSelector } from 'react-redux';
import { createGoogleClient, createGoogleWorker } from '../../Redux/Reducer/reducer';


const LoginGoogle = () => {
    
    const dispatch = useDispatch()
    
    const handleSubmitClient = () => {
        dispatch(createGoogleClient())
    }
    const handleSubmitWorker = () => {
        dispatch(createGoogleWorker())
    }
    
    return (
        <div className='Register_component'>
        <HeaderRegister/>
        <div className='Register_divclientWorker'>
            <div className='Register_Worker'>
            <p className='Register_orTitle'>Inicia sesión como <span className='Register_orTitleOrange'>FreeLancer</span></p>
            <div className='Register_divImage'>
                <img src={imageWorker} alt='Register'/>
            </div>
            <button onClick={handleSubmitWorker}  className='Register_button'>Ingresa</button>        
            </div>
            <div className='Register_Client'>
                <p className='Register_orTitle'>Inicia sesión como <span className='Register_orTitleOrange'>Cliente</span></p>
                <div className='Register_divImage'>
                <img src={imageClient} alt='Register'/>
                </div>
                <button onClick={handleSubmitClient} className='Register_button'>Ingresa</button>
            </div>
        </div>

    </div>
    )
}

export default LoginGoogle
