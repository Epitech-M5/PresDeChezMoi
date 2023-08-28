import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  fetchUtilisateurData,
  fetchRefreshToken,
  fetchToken,
} from "../../redux/Utilisateur";
const ButtonDisconnect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const disconnect = () => {
    dispatch(isLogin(false));
    dispatch(fetchToken(""));
    dispatch(fetchRefreshToken(""));
    dispatch(fetchUtilisateurData(""));
    navigate("/");
  };

  return (
    <>
      <div className="container_buttons_home">
        <button
          className="btn_home"
          onClick={disconnect}
        ></button>
      </div>
    </>
  );
};

export default ButtonDisconnect;
