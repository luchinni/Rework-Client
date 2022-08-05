import React from 'react';
import Top from './Top/Top';
import Header from '../Header/Header';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <main className='Landing_component'>
        <Header/>
        <Top />
    </main>
  )
}

export default LandingPage