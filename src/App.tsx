import React, { useEffect } from 'react';
import { Routes, Navigate, Route, useNavigate, useNavigationType } from 'react-router-dom';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import DetailOffer from './Components/Offer/DetailOffer/DetailOffer';
import Register from './Components/Register/Register';
import Worker from './Components/Register/WorkerRegister/WorkerRegister';
import Client from './Components/Register/ClientRegister/ClientRegister';
import Footer from './Components/Footer/Footer';
// import Login from './Components/Login/Login';
import LoginComponent from './Components/Login/LoginComponent/LoginComponent';
import Profile from './Components/Profile/Profile';
import OfferPost from './Components/Offer/OfferPost/OfferPost';
import OtherProfile from './Components/Profile/OtherProfile';
import VerifyUser from './Components/Register/VerifyUser/VerifyUser';
import { useSelector } from 'react-redux';
import FormPago from './Components/FormPago/FormPago';
import Dashboard from './Components/Dashboard/Dashboard';
// import Portfolio from './Components/Profile/Portfolio/FormPortfolio/FormPortfolio';



function App() {
  
  const navigate:any = useNavigate()
  const token = localStorage.getItem("token")
  const currentUser: any = useSelector((state: any) => state.workService.currentUser)

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='home' element={<Home/>} />
        <Route path='confirm/worker/:id' element={<VerifyUser/>}/>
        <Route path='confirm/client/:id' element={<VerifyUser/>}/>
        {token || currentUser.id !== '' ?
        <>
          <Route path='register' element={<Navigate to='/home' replace/>} />
          <Route path='register/worker' element={<Navigate to='/home' replace/>}/>
          <Route path='register/client' element={<Navigate to='/home' replace/>}/>
          <Route path='login' element={<Navigate to='/home' replace/>} />
          <Route path='myProfile' element={<Profile/>}/>
          <Route path='profile/:id' element={<OtherProfile/>} />
          <Route path='post' element={<OfferPost/>} />
          <Route path='pago/:id' element={<FormPago/>} />
          <Route path='detailOffer/:id' element={<DetailOffer/>} />
          <Route path='dashboard' element={<Dashboard />} />
        </>
          :
        <>
          <Route path='register' element={<Register/>} />
          <Route path='register/worker' element={<Worker/>} />
          <Route path='register/client' element={<Client/>} />
          <Route path='login' element={<LoginComponent/>} />
          <Route path='pago/:id' element={<Navigate to='/register' replace/>} />
          <Route path='myProfile' element={<Navigate to='/register' replace/>} />
          <Route path='profile/:id' element={<Navigate to='/register' replace/>} />
          <Route path='post' element={<Navigate to='/register' replace/>} />
          <Route path='detailOffer/:id' element={<Navigate to='/register' replace/>} />
        </>}
        {/* <Route path="portfolio" element={<Portfolio/>}/> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
