import React from 'react';
import Top from './Top/Top';
import Header from '../Header/Header';
import './LandingPage.css';

const LandingPage = () => {
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