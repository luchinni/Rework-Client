import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import DetailOffer from './Components/DetailOffer/DetailOffer';
import Register from './Components/Register/Register';
import Worker from './Components/Register/WorkerRegister/WorkerRegister';
import Client from './Components/Register/ClientRegister/ClientRegister';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';



function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='home' element={<Home/>} />
        <Route path='detailOffer/:id' element={<DetailOffer/>} />
        <Route path='register' element={<Register/>} />
        <Route path='register/worker' element={<Worker/>} />
        <Route path='register/client' element={<Client/>} />
        <Route path='login' element={<Login/>} />
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
