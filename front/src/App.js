import React, { useState } from "react";
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
import ChatBot from "./components/MainComponent/ChatBot";
import NavBarHome from "./components/MainComponent/NavBarHome";
import UserMenu from "./components/MainComponent/UserMenu";
import ResearchBar from "./components/MainComponent/ResearchBar";
import Protected from "./protected";
import { Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import Chat from "./components/MainComponent/Chat/Chat";
import AdministrationPage from "./pages/AdministrationPage";
import NavBarAdmin from "./components/Admin/NavBarAdmin";


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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound navigation={"/"} />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <FooterLandingPage />
    </>

  );
};

const HomeContainer = () => {

  const user = useSelector((state) => state.utilisateur)

  if (user.isLogin && user.idRole === 3) {
    return (
      <>
        <ChatBot />
        <ResearchBar />
        <NavBarHome isAdmin='admin' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  }
  if (user.isLogin) {
    return (
      <>
        <ChatBot />
        <ResearchBar />
        <NavBarHome />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  }
  else {
    return (<Navigate to="/login" replace />);
  }

};

const AdminContainer = () => {

  const user = useSelector((state) => state.utilisateur)

  if (user.isLogin && user.idRole === 3) {
    return (
      <>
        <NavBarAdmin />
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<AdministrationPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    );
  }

  else {
    return (<Navigate to="/login" replace />);
  }
}

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
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<LandingContainer />} />
            <Route path="/home/*" element={<HomeContainer />} />
            <Route path="/home/administration/*" element={<AdminContainer />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    )
  );
};

export default App;
