import React, { useEffect } from 'react';
import TopClient from './TopClient/TopClient';
import TopWorker from './TopWorker/TopWorker';
import Header from '../Header/Header';
import './LandingPage.css';
import { useDispatch } from 'react-redux';
import { checkSession } from '../../Redux/Reducer/reducer';
import { Link } from 'react-router-dom';
import newTab from "../../images/openNewTab.png"


const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession())
  }, [])

  return (
    <main className='Landing_component'>
        <Header/>
        <div className='Landing_divContent'>
          <TopClient/>
          <TopWorker/>
        </div>
        <div className='Landing_buttonLogin'>
        <Link to="/home" className='Landing_buttonAcceder'>Prueba la APP<img className='new_tabIcon' src={newTab} alt="" /></Link>
        </div>
    </main>
  )
}

export default LandingPage