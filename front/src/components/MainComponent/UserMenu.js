import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserMenu = (liDiffPosition, liFirstPosition) => {
  // l'image de profil de l'utilisateur est stocké dans le redux, celle-ci est automatiquement chargé
  // au cas ou la position du menu c'est les param de .ms-nav impossible de le mettre en relative avec les autres balise (z-index 40000, container bye, ...)

  liFirstPosition = "140%"; // Première bulle
  liDiffPosition = "105%"; // diff entre les bulles

  const user = useSelector((state) => state.utilisateur);

  const navigate = useNavigate();

  function handleNavigate(goTo){
    // eslint-disable-next-line default-case
    switch (goTo) {
      case 1:
        return navigate("/home/user/settings");
      case 2:
        return navigate("/login");
    }
  };

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
          <a onClick={() => console.log("00000")}>
            {/* <a onClick={console.log('morgan ca bug')}> */}
            {/* un console.log onClick c'est comme ça : onClick={() => console.log('morgan ca bug')} */}
            <label className="ms-menu-toggle-lbl" for="ms-menu">
              <img
                src={`../../media/img/${user.photoProfil}.png`}
                alt="logo"
                className="userProfile"
              />
            </label>
            <h3>{user.pseudo}</h3>
          </a>
        </li>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>
        <div className="ms-nav-point"> </div>

        <li className="ms-li ms-li1 ms-li-first">
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
