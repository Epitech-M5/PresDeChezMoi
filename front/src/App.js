import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Test from "./pages/Test";
import TeamPage from "./pages/TeamPage";
import Notification from "./pages/Notification";
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
import { Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import Chat from "./components/MainComponent/Chat/Chat";
import NavBarAdmin from "./components/Admin/NavBarAdmin";
import General from "./components/Admin/General";
import Role from "./components/Admin/Role";
import Tickets from "./components/Admin/Tickets";
import Event from "./components/Admin/Event";
import Post from "./components/Admin/Post";
import ViewPost from "./pages/ViewPost";
import { useParams } from "react-router-dom";
import { getAPI } from "./api";
import NavBarUser from "./components/User/NavBarUser";
import Settings from "./components/User/Settings";
import Myposts from "./components/User/Myposts";
import MySave from "./components/User/MySave";
import MyLoot from "./components/User/MyLoot";
import ViewProfile from "./pages/ViewProfile";
import MapPage from "./pages/MapPage";
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT
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

  if (user.isLogin && user.idRole === 3 || user.isLogin && user.idRole === 2) {
    return (
      <>
        <ChatBot />
        <ResearchBar />
        <NavBarHome isAdmin='admin' />
        {/* <UserMenu /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/notif" element={<Notification />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<PageNotFound navigation={"/home"} />} />
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
        {/* <UserMenu /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/notif" element={<Notification />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="*" element={<PageNotFound navigation={"/home"} />} />
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

  console.log("EEEEEEEEEEEEEEEEEEE", user)

  if (user.isLogin && user.idRole === 3) {
    return (
      <>
        <NavBarAdmin />
        <Routes>
          <Route path="/" element={<General />} />
          <Route path="*" element={<PageNotFound navigation={"/home"} />} />
          <Route path="/role-user" element={<Role />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/notif-event" element={<Event />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </>
    );
  }

  else if (user.isLogin && user.idRole === 2) {
    return (
      <>
        <NavBarAdmin type='modo' />
        <Routes>
          <Route path="*" element={<PageNotFound navigation={"/home"} />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/notif-event" element={<Event />} />
          <Route path="/" element={<Post />} />
        </Routes>
      </>
    );
  }

  else {
    return (<Navigate to="/login" replace />);
  }
}

const ViewProContainer = () => {

  const [idToVerif, setIdToVerif] = useState([]);
  const { id } = useParams();
  const parsedId = parseInt(id);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.utilisateur);

  console.log("UUUSSSEERRRR", user)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAPI(`http://${adresseip}:${port}/api/user/`, {}, { "x-access-token": user.token });
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", response)
        const ids = response.dataAPI.map(item => item.id);
        setIdToVerif(ids);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="to_center_in_appjs">
        <h1>Chargement ...</h1>
      </div>
    )
  }

  const isValidId = idToVerif.includes(parsedId);

  return (
    <>
      {isValidId ? (
        <Routes>
          <Route path="/" element={<ViewProfile postId={id} />} />
        </Routes>
      ) : (
        <PageNotFound navigation={'/login'} />
      )}
    </>
  );

}

const ViewContainer = () => {

  const [idToVerif, setIdToVerif] = useState([]);
  const { id } = useParams();
  const parsedId = parseInt(id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAPI(`http://${adresseip}:${port}/api/annonce/`, {}, {});
        const ids = response.dataAPI.map(item => item.id);
        setIdToVerif(ids);
        setIsLoading(false);
      } catch (error) {
        console.log('error', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="to_center_in_appjs">
        <h1>Chargement ...</h1>
      </div>
    )
  }

  const isValidId = idToVerif.includes(parsedId);

  return (
    <>
      {isValidId ? (
        <Routes>
          <Route path="/" element={<ViewPost postId={id} />} />
        </Routes>
      ) : (
        <PageNotFound navigation={'/login'} />
      )}
    </>
  );
}

const UserContainer = () => {

  const user = useSelector((state) => state.utilisateur)

  if (user.isLogin && user.idRole === 3) {
    return (
      <>
        <NavBarUser />
        <Routes>
          <Route path="/settings" element={< Settings />} />
          <Route path="/my-posts" element={< Myposts />} />
          <Route path="/my-save" element={< MySave />} />
          <Route path="/my-loot" element={< MyLoot />} />
          <Route path="*" element={<PageNotFound navigation={"/home"} />} />
        </Routes>
      </>
    );
  }
  if (user.isLogin) {

    return (
      <>
        <NavBarUser />
        <Routes>
          <Route path="/settings" element={< Settings />} />
          <Route path="/my-posts" element={< Myposts />} />
          <Route path="/my-save" element={< MySave />} />
          <Route path="/my-loot" element={< MyLoot />} />
          <Route path="*" element={<PageNotFound navigation={"/home"} />} />
        </Routes>
      </>
    )
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
            <Route path="/home/user/*" element={<UserContainer />} />
            <Route path="/home/view-profile/:id" element={<ViewProContainer />} />
            <Route path="/view-post/:id" element={<ViewContainer />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    )
  );
};

export default App;