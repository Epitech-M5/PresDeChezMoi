<<<<<<< HEAD
import React, {useState} from "react";
=======
import React, { useState } from "react";
>>>>>>> dev
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Test from "./pages/Test";
import TeamPage from "./pages/TeamPage";
import NavBarLandingPage from "./components/NavBarLandingPage";
import FooterLandingPage from "./components/FooterLandingPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AnimateBackground from "./components/AnimateBackground";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";

const LandingContainer = () => {
  return (
    <>
      <NavBarLandingPage />
      <AnimateBackground />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <FooterLandingPage />
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("spinner_onload");

  if (spinner) {
    setTimeout(() => {
      document.querySelector(".container_onload").classList.add("fade_out");
      spinner.style.display = "none";
      setLoading(false);
      document.querySelector(".body").classList.add("fade_in");
    }, 2000);
  }
  return (
    !loading && (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<LandingContainer />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    )
  );
};

export default App;
