import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';

function App() {
  return (
    <div className="App">
      <Header/>
      <LandingPage/>
      <Home/>
    </div>
  );
}

export default App;
