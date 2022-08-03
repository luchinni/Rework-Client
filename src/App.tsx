import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='home' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
