import { React, useEffect, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { getAPI, postAPI, putAPI, deleteAPI } from "../api";
import MessageQueue, { useMessageQueue } from "../components/MessageQueue.js";
import { useNavigate } from "react-router-dom";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;
const ForgotPassword = () => {
    const navigate = useNavigate();
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [status, setStatus] = useState(false);
  const [tokenUser, setTokenUser] = useState("");
  const [password_input_1, setPassword1] = useState("");
  const [password_input_2, setPassword2] = useState("");
  const { addMessage, removeMessage, messages } = useMessageQueue();

  const handlePassword1 = (event) => {
    setPassword1(event.target.value);
  };

  const handlePassword2 = (event) => {
    setPassword2(event.target.value);
  };

  const change_eye1 = () => {
    setEye1((prevState) => !prevState);
  };

  const change_eye2 = () => {
    setEye2((prevState) => !prevState);
  };

  const modifMdp = () => {
    if (password_input_1 != "") {
      if (password_input_2 != "") {
        if (password_input_1 == password_input_2) {
          console.log("C'est ok", "info");
          putAPI(
            `http://${adresseip}:${port}/api/user/edit_password`,
            { motDePasse: password_input_1 },
            { "x-access-token": tokenUser }
          )
            .then((response) => {
                addMessage("La modification du mot de passe a bien été prise en compte", "info");
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            })
            .catch((error) => {
              console.log("error response mdp oublie", error);
            });
        } else {
          addMessage("Les mots de passe ne correspondent pas", "info");
        }
      } else {
        addMessage("Veuillez remplir tout les champs", "info");
      }
    } else {
      addMessage("Veuillez remplir tout les champs", "info");
    }
  };

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const token = queryParameters.get("key");
    setTokenUser(token);
    // Vérification du token
    getAPI(
      `http://${adresseip}:${port}/api/user/check_token_mdp_oublie`,
      {},
      { "x-access-token": token }
    )
      .then((response) => {
        console.log("response", response);
        if (response.dataAPI) {
          console.log("true");
          setStatus(true);
        } else {
          console.log("false");
          setStatus(false);
        }
      })
      .catch((error) => {
        console.log("error response mdp oublie", error);
      });
  }, []);
  if (status) {
    return (
      <>
        <MessageQueue messages={messages} removeMessage={removeMessage} />
        <div className="container_nice_form">
          <div className="form_nice">
            <div className="title_nice_form">
              <h1>Modifier son mot de passe</h1>
            </div>
            <form action="" className="container_inputs_nice">
              <div className="max_width">
                <div className="input_field">
                  <i onClick={change_eye1} className="slash_eye">
                    {eye1 ? (
                      <AiOutlineEye size={"2rem"} />
                    ) : (
                      <AiOutlineEyeInvisible size={"2rem"} />
                    )}
                  </i>
                  <input
                    type={eye1 ? "text" : "password"}
                    placeholder="Nouveau mot de passe"
                    onChange={handlePassword1}
                  />
                </div>
              </div>
              <div className="max_width">
                <div className="input_field">
                  <i onClick={change_eye2} className="slash_eye">
                    {eye2 ? (
                      <AiOutlineEye size={"2rem"} />
                    ) : (
                      <AiOutlineEyeInvisible size={"2rem"} />
                    )}
                  </i>
                  <input
                    type={eye2 ? "text" : "password"}
                    placeholder="Confirmer votre mot de passe"
                    onChange={handlePassword2}
                  />
                </div>
              </div>
              <input
                type="button"
                value="Modifier"
                className="btn_login center_submit"
                onClick={modifMdp}
              />
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container_nice_form">
          <div className="">
            <div className="title_nice">
              <h1>La session à expiré. Veuillez réessayer</h1>
              <button>Retour à l'accueil</button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ForgotPassword;
