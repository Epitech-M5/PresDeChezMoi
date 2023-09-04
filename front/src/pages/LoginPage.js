import { React, useEffect, useState, useRef } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "../api";

import { useNavigate } from "react-router-dom";
import MessageQueue, { useMessageQueue } from "../components/MessageQueue.js";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { isLogin, fetchUtilisateurData, fetchRefreshToken, fetchToken, fetchVille} from "../redux/Utilisateur";
import Modal from '../components/MainComponent/Modal.js';
import emailjs from 'emailjs-com';

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT


const LoginPage = () => {

  const form = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [idLogin, setIdLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const [idRegister, setIdRegister] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [mailPassword, setMailPassword] = useState("");
  const [link, setLink] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { addMessage, removeMessage, messages } = useMessageQueue();

  const handleNavigationRegister = (event) => {

    event.preventDefault();

    if (
      idRegister.length <= 0 ||
      passwordRegister.length <= 0 ||
      email.length <= 0
    ) {
      addMessage(
        'Les champs "Identifiant", "Mot de passe" et "Email" ne sont pas remplis',
        "info"
      );
    } else {


      axios
        .post(`http://${adresseip}:${port}/api/user/auth/signup`, { "pseudo": idRegister, "mail": email, "motDePasse": passwordRegister, "idRole": 1, "photoProfil": "1" })
        .then(response => {

          // permet de récupérer les info utilisateurs retourné dans la response
          var data = response.data;

          // Initialisation de l'objet qui va comporter les information de l'utilisateur pour le stocker dans redux(store)
          var infoUtilisateur = {
            pseudo: data.pseudo,
            idRole: data.idRole,
            idutilisateur: data.id,
            // idVille: data.idVille,
            photoProfil: data.photoProfil,
          };
          addMessage('Votre compte a bien été crée ! Attendez quelques instant...', 'success');
          // Stock dans store
          dispatch(isLogin());
          dispatch(fetchToken(data.accessToken));
          dispatch(fetchRefreshToken(data.refreshToken));
          dispatch(fetchUtilisateurData(infoUtilisateur));
          dispatch(fetchVille(data.idVille));

          setTimeout(() => {
            navigate('/home')
          }, 3000);
        }).catch(error => {
          console.log("error", error);
          addMessage(`${error}`, 'error');
        })

    }
  };

  const handleNavigationLogin = (event) => {
    event.preventDefault();

    if (idLogin.length <= 0 || passwordLogin.length <= 0) {
      addMessage('Les champs "Identifiant" et "Mot de passe" ne sont pas remplis', 'info');
    }

    else {

      axios
        .post(`http://${adresseip}:${port}/api/user/auth/signin`, { "pseudo": idLogin, "motDePasse": passwordLogin })
        .then(response => {

          console.log(response)
          // permet de récupérer les info utilisateurs retourné dans la response
          var data = response.data;
          console.log("data", data)
          // Initialisation de l'objet qui va comporter les information de l'utilisateur pour le stocker dans redux(store)
          var infoUtilisateur = {
            pseudo: data.pseudo,
            idRole: data.idRole,
            idutilisateur: data.id,
            idVille: data.idVille,
            photoProfil: data.photoProfil,
          };
          addMessage('Connexion réussie, attendez quelques instants....', 'success');
          // Stock dans store
          dispatch(isLogin());
          dispatch(fetchToken(data.accessToken));
          dispatch(fetchRefreshToken(data.refreshToken));
          dispatch(fetchUtilisateurData(infoUtilisateur));
          dispatch(fetchVille(data.idVille));

          if (data.idRole === 4) {
            setTimeout(() => {
              navigate('/super-admin')
            }, 3000);
          }

          else {
            setTimeout(() => {
              navigate('/home')
            }, 3000);
          }

        }).catch(error => {
          console.log("error", error);
          addMessage(`${error}`, 'error');
        })

    }
  };

  const handleId_login = (event) => {
    setIdLogin(event.target.value);
  };
  const handleForgotPasswordButton = (event) => {
    alert(mailPassword);
  };

  const handlePassword_login = (event) => {
    setPasswordLogin(event.target.value);
  };

  const handleId_register = (event) => {
    setIdRegister(event.target.value);
  };

  const handleForgotPassword = (event) => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePassword_register = (event) => {
    setPasswordRegister(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    alert(mailPassword);
    if (mailPassword.length <= 0) {
      addMessage("Tous les champs doivent être remplis", "info");
    } else {
      // Check si l'user existe
      getAPI(
        `http://${adresseip}:${port}/api/user/user_by_email/${mailPassword}`, {}
      )
        .then((response) => {
          if (response.dataAPI) {
            setLink(`http://127.0.0.1:3000/forgot-password?key=${response.dataAPI.token}`);

            addMessage("Votre message à bien été envoyé", "success");
            const emailParams = {
              to_email: mailPassword,
              from_name: "PrèsDeChezMoi",
              message: `Voici un lien pour réinitialiser votre mot de passe pour notre site.\nSi vous n'étes pas à l'origine de cette demande, merci de l'ignorer \n${link}`,
            };
            emailjs.init("AHMnZTYTrMKEh55qV");

            // 200 email par mois, id : presdechezmoi.email@gmail.com mdp : 123Azerty#
            emailjs
              .send("service_49ij8lf", "template_mlkaalj", emailParams)
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log(error.text);
                }
              );
          } else {
            alert("Le mail n'éxiste pas");

          }
        })
        .catch((error) => {
          console.log("error response mdp oublie", error);
        });

      // setTimeout(() => {
      //     window.location.reload();
      // }, 3000)
    }
  };

  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container_loginpage");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign_up_mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign_up_mode");
    });
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="container_x">
          <i className="fa-solid fa-xmark" onClick={closeModal}></i>
        </div>
        <div className="wrapper_popup">
          <form action="" ref={form} onSubmit={handleSubmitEmail}>
            <input
              placeholder="exemple@gmail.com"
              name="email"
              onChange={(event) => setMailPassword(event.target.value)}
            />
            {/* <button onClick={handleForgotPasswordButton}>VALIDE</button> */}
            <input
              type="submit"
              value="Envoyer"
              onSubmit={handleForgotPasswordButton}
            />
          </form>
        </div>
      </Modal>
      <MessageQueue messages={messages} removeMessage={removeMessage} />
      <div className="container_loginpage">
        <div className="forms_container">
          <div className="signin_signup">
            <form
              action=""
              className="sign_in_form"
              onSubmit={handleNavigationLogin}
            >
              <h2 className="title_login">Se connecter</h2>
              <div className="input_field">
                <i class="fa-solid fa-user"></i>
                <input
                  type="text"
                  placeholder="Identifiant"
                  onChange={handleId_login}
                />
              </div>
              <div className="input_field">
                <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handlePassword_login}
                />
              </div>
              <input
                type="submit"
                value="Se connecter"
                className="btn_login center_submit"
              />
              {/* <a href="/forgot-password" target='_blank' id='forgot_password'><h3>Mot de passe oublié ?</h3></a> */}
              <a
                onClick={handleForgotPassword}
                target="_blank"
                id="forgot_password"
              >
                <h3>Mot de passe oublié ?</h3>
              </a>
              <p className="social_text">Retrouvez nous sur nos réseaux</p>
              <div className="social_login">
                <a
                  onClick={() =>
                    window.open(
                      "https://instagram.com/presdechezmoi?igshid=OGQ5ZDc2ODk2ZA==",
                      "_blank"
                    )
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=100094532983584",
                      "_blank"
                    )
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  onClick={() =>
                    window.open("https://twitter.com/PresDeChezMoi", "_blank")
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/mfive-presdechezmoi-80aa89282/",
                      "_blank"
                    )
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </form>

            <form
              action=""
              className="sign_up_form"
              onSubmit={handleNavigationRegister}
            >
              <h2 className="title_login">S'enregistrer</h2>
              <div className="input_field">
                <i class="fa-solid fa-user"></i>
                <input
                  type="text"
                  placeholder="Identifiant"
                  onChange={handleId_register}
                />
              </div>
              <div className="input_field">
                <i class="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleEmail}
                />
              </div>
              <div className="input_field">
                <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handlePassword_register}
                />
              </div>
              <input
                type="submit"
                value="S'enregistrer"
                className="btn_login center_submit"
              />
              <p className="social_text">Retrouvez nous sur nos réseaux</p>
              <div className="social_login">
                <a
                  onClick={() =>
                    window.open(
                      "https://instagram.com/presdechezmoi?igshid=OGQ5ZDc2ODk2ZA==",
                      "_blank"
                    )
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
                <a
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=100094532983584",
                      "_blank"
                    )
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  onClick={() =>
                    window.open("https://twitter.com/PresDeChezMoi", "_blank")
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/mfive-presdechezmoi-80aa89282/",
                      "_blank"
                    )
                  }
                  className="social_login_icon"
                >
                  <i class="fa-brands fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels_container">
          <div className="panel left_panel">
            <div className="content_panel">
              <h3>Nouveau ici ?</h3>
              <p>Vous êtes nouveau ici ? Bienvenue sur notre plateforme !</p>
              <button className="btn_login transparent" id="sign-up-btn">
                S'enregistrer
              </button>
            </div>
            <img
              src="media/img/login.png"
              alt="login_img"
              className="img_panel"
            />
          </div>

          <div className="panel right_panel">
            <div className="content_panel">
              <h3>Déjà chez nous ?</h3>
              <p>
                Vous avez déjà un compte ? Content de vous revoir sur notre
                plateforme !
              </p>
              <button className="btn_login transparent" id="sign-in-btn">
                Se connecter
              </button>
            </div>
            <img
              src="media/img/signup.png"
              alt="register_img"
              className="img_panel"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
