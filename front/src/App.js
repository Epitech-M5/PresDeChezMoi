import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Test from './pages/Test';
import TeamPage from './pages/TeamPage';
import NavBarLandingPage from './components/NavBarLandingPage';

const App = () => {
  return (
    <BrowserRouter>
      <NavBarLandingPage />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/test' element={<Test />} />
        <Route path='/team' element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;