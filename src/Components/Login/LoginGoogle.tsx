import React from 'react'
import { Link } from 'react-router-dom';
import HeaderRegister from '../Register/HeaderRegister/HeaderRegister';
import imageClient from "../../images/Online report_Isometric (1).png"
import imageWorker from "../../images/Money_motivation _Flatline.png"
import { useDispatch } from 'react-redux';
import { createGoogleClient, createGoogleWorker } from '../../Redux/Reducer/reducer';
import { useState } from 'react';

const LoginGoogle = () => {
   const dispatch = useDispatch()
    const [google, setGoogle] = useState()
    console.log("google", google)
    /* const googleWorker = () => {
        dispatch(createGoogleWorker())
    }
 */
    const googleClient = () => {
        localStorage.setItem(
            "loginWithGoogleType",
            "client"
          );
        return dispatch(createGoogleClient())
    } 


    const handleSubmitClient = async (e:any) => {
        e.preventDefault()
        const response: any = await googleClient()
        console.log("response", response.request.responseURL)
         window.open("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgoogle%2Fauth%2Fclient%2F&scope=profile%20email&client_id=125588834339-dn5o5nsgkeb69itt29dqsqobiova6ogi.apps.googleusercontent.com&flowName=GeneralOAuthFlow") 
        setGoogle(response)
    }

   /*  const handleSubmitWorker = async (e:any) => {
        e.preventDefault()
    } */


  /* const googleWorker = () => {
        window.open("https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Flogin%2Fgoogle%2Fworker&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=125588834339-f0kipod1bvr0baaamkrb88d12ei73v29.apps.googleusercontent.com", "_self")
    }  */

    /*const googleClient = () => {
        window.open("https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Flogin%2Fgoogle%2Fclient&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=125588834339-f0kipod1bvr0baaamkrb88d12ei73v29.apps.googleusercontent.com&flowName=GeneralOAuthFlow", "_self")
    } */

    return (
    <div className='Register_component'>
        <HeaderRegister/>
        <div className='Register_divclientWorker'>
            <div className='Register_Worker'>
            <p className='Register_orTitle'>Inicia sesión como <span className='Register_orTitleOrange'>FreeLancer</span></p>
            <div className='Register_divImage'>
                <img src={imageWorker} alt='Register'/>
            </div>
            <button  /* onClick={googleWorker}   */className='Register_button'>Ingresa</button>        
            </div>
            <div className='Register_Client'>
                <p className='Register_orTitle'>Inicia sesión como <span className='Register_orTitleOrange'>Cliente</span></p>
                <div className='Register_divImage'>
                <img src={imageClient} alt='Register'/>
                </div>
                <button onClick={(e) => handleSubmitClient(e)} className='Register_button'>Ingresa</button>
            </div>
        </div>

    </div>
    )
    }

export default LoginGoogle