import React, { useState } from "react";

const UserMenu = (props) => {
  // a faire :
  // - faire une props pour le logo
  // - mettre le background des rond gradient avec le orange de la charte graphique
  // - faire une props pour le spacing des rond
  var mainLogo = props.image;


  return (
    <div className="ms-nav-container">
      <ul className="ms-nav">
        <input
          type="checkbox"
          id="ms-menu"
          className="ms-menu-toggle"
          name="ms-menu-toggle"
        />
        <li className="ms-main">
          <a href="javascript:void(0)">
            <label className="ms-menu-toggle-lbl" for="ms-menu">
              <img src={mainLogo} alt="logo" className="userProfile" />
              <h3>Pseudo</h3>
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
          <a href="javascript:void(0)">
            <span className="fa fa-search"></span>
          </a>
        </li>
        <li className="ms-li ms-li2">
          <a href="javascript:void(0)">
            <span className="fa fa-cog"></span>
          </a>
        </li>
        <li className="ms-li ms-li3 ms-li-last">
          <a href="javascript:void(0)">
            <span className="fa fa-sliders"></span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;