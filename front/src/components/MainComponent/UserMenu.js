import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  // a faire :
  // - faire une props pour le logo
  // - mettre le background des rond gradient avec le orange de la charte graphique
  // - faire une props pour le spacing des rond

  const user = useSelector((state) => state.utilisateur);

  const navigate = useNavigate();

  const handleNavigate = (goTo) => {
    switch (goTo) {
      case 1:
        return navigate('/home/user-settings');
      case 2:
        return console.log('se deconnecter')
    }
  };

  return (
    <div className="ms-nav-container">
      <ul className="ms-nav">
        <input
          type="checkbox"
          id="ms-menu"
          className="ms-menu-toggle"
          name="ms-menu-toggle"
          onClick={console.log('logo clicked')}
        />
        <li className="ms-main">
          <a>
            <label className="ms-menu-toggle-lbl" for="ms-menu">
              <img src={`${user.pathImage}`} alt="logo" className="userProfile" />
              <h3>{user.pseudo}</h3>
            </label>
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
          <a onClick={console.log('bouton 1')}>
            <span className="fa-solid fa-gear"></span>
          </a>
        </li>
        <li className="ms-li ms-li2">
          <a onClick={console.log('bouton 2')}>
            <span className="fa-solid fa-right-from-bracket"></span>
          </a>
        </li>

      </ul>
    </div >
  );
};

export default UserMenu;