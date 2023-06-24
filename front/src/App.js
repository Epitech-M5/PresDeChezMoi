import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Test from './pages/Test';
import TeamPage from './pages/TeamPage';
import NavBarLandingPage from './components/NavBarLandingPage';
import FooterLandingPage from './components/FooterLandingPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <NavBarLandingPage />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/team' element={<TeamPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
      <FooterLandingPage />
    </BrowserRouter>
  );
};

export default App;