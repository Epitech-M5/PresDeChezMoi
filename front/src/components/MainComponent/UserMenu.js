import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../../api";
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;

const UserMenu = (liDiffPosition, liFirstPosition) => {
  // l'image de profil de l'utilisateur est stocké dans le redux, celle-ci est automatiquement chargé
  // au cas ou la position du menu c'est les param de .ms-nav impossible de le mettre en relative avec les autres balise (z-index 40000, container bye, ...)

  liFirstPosition = "200%"; // Première bulle
  liDiffPosition = "110%"; // diff entre les bulles

  const user = useSelector((state) => state.utilisateur);

  const navigate = useNavigate();

  const [truncatedPseudo, setTruncatedPseudo] = useState(user.pseudo);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAPI(
      `http://${adresseip}:${port}/api/user/${user.idutilisateur}`,
      {},
      { "x-access-token": user.token }
    )
      .then((response) => {
        console.log("RERERERERERERERERER", response);

        setTimeout(() => {
          setData(response.dataAPI);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 650 || window.innerHeight <= 450) {
        setTruncatedPseudo(
          user.pseudo.length > 5
            ? `${user.pseudo.substring(0, 5)}...`
            : user.pseudo
        );
      } else {
        setTruncatedPseudo(user.pseudo);
      }
    }

    handleResize(); // Appel initial
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user.pseudo]);

  function handleNavigate(goTo) {
    switch (goTo) {
      case 1:
        return navigate("/home/user/settings");
      case 2:
        return navigate("/login");
      default:
        break;
    }
  }

  return (
    <div className="ms-nav-container">
      <ul
        className="ms-nav"
        style={{
          "--liFirstPosition": liFirstPosition,
          "--liDiffPosition": liDiffPosition,
        }}
      >
        <input
          type="checkbox"
          id="ms-menu"
          className="ms-menu-toggle"
          name="ms-menu-toggle"
          onClick={console.log("logo clicked")}
        />
        <li className="ms-main">
          <a>
            <label className="ms-menu-toggle-lbl" for="ms-menu">
              <img
                src={`../../media/img/${user.photoProfil}.png`}
                alt="logo"
                className="userProfile"
              />
            </label>
            <h3 className="ms-pseudo">{truncatedPseudo}</h3>
            <span className="usermenu-score">
              {data.score ? <>{data.score}</> : <>0</>}
              <i class="fa-solid fa-carrot"></i>
            </span>
          </a>
        </li>
        {/* <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div> */}

        <li className="ms-li ms-li1">
          <a onClick={() => handleNavigate(1)}>
            <span className="fa-solid fa-gear"></span>
          </a>
        </li>
        <li className="ms-li ms-li2">
          <a onClick={() => handleNavigate(2)}>
            <span className="fa-solid fa-right-from-bracket"></span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;