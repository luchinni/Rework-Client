import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import DetailOffer from './Components/DetailOffer/DetailOffer';
import Register from './Components/Register/Register';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='home' element={<Home/>} />
        <Route path='detailOffer/:id' element={<DetailOffer/>} />
        <Route path='register' element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
