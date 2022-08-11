import React, { useEffect } from 'react';
import Top from './Top/Top';
import Header from '../Header/Header';
import './LandingPage.css';
import { useDispatch } from 'react-redux';
import { checkSession } from '../../Redux/Reducer/reducer';

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSession())
  }, [])

  return (
    <main className='Landing_component'>
        <Header/>
        <div className='Landing_divContent'>
          <Top />
        </div>
    </main>
  )
}

export default LandingPage