import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MessageQueue, { useMessageQueue } from '../components/MessageQueue.js';
import axios from 'axios';

import { useDispatch } from "react-redux";
import { isLogin } from "../redux/Utilisateur";
import {useSelector} from "react-redux"

const LoginPage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [idLogin, setIdLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [idRegister, setIdRegister] = useState("");
    const [email, setEmail] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");

    const { addMessage, removeMessage, messages } = useMessageQueue();


    const handleNavigationRegister = (event) => {

        event.preventDefault();

        console.log("input id : " + idRegister);
        console.log("input pwd : " + passwordRegister);
        console.log("input email : " + email);

        if (idRegister.length <= 0 || passwordRegister.length <= 0 || email.length <= 0) {
            addMessage('Les champs "Identifiant", "Mot de passe" et "Email" ne sont pas remplis', 'info');
        }

        else {

            axios
                .post("http://127.0.0.1:8081/api/user/auth/signup", { "pseudo": idRegister, "mail": email, "motDePasse": passwordRegister, "idRole": 2 })
                .then(response => {

                    console.log(response)

                    addMessage('Votre compte a bien été crée ! Attendez quelques instant...', 'success');

                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);

                }).catch(error => {
                    console.log("error", error);
                    addMessage(`${error}`, 'error');
                })

        }

    }

    const handleNavigationLogin = (event) => {

        event.preventDefault();

        console.log("input id : " + idLogin);
        console.log("input pwd : " + passwordLogin);

        if (idLogin.length <= 0 || passwordLogin.length <= 0) {
            addMessage('Les champs "Identifiant" et "Mot de passe" ne sont pas remplis', 'info');
        }

        else {

            axios
                .post("http://127.0.0.1:8081/api/user/auth/signin", { "pseudo": idLogin, "motDePasse": passwordLogin })
                .then(response => {

                    console.log(response)
                    // isLogin(idLogin,true)
                    addMessage('Connexion réussie, attendez quelques instants....', 'success');
                    dispatch(isLogin(idLogin));
                    setTimeout(() => {
                        navigate('/home')
                    }, 3000);

                }).catch(error => {
                    console.log("error", error);
                    addMessage(`${error}`, 'error');
                })

        }

    }

    const handleId_login = (event) => {
        setIdLogin(event.target.value);
    }

    const handlePassword_login = (event) => {
        setPasswordLogin(event.target.value);
    }

    const handleId_register = (event) => {
        setIdRegister(event.target.value);
    }

    const handlePassword_register = (event) => {
        setPasswordRegister(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

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
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className="container_loginpage">
                <div className="forms_container">
                    <div className="signin_signup">

                        <form action="" className='sign_in_form'>
                            <h2 className='title_login'>Se connecter</h2>
                            <div className="input_field">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" placeholder='Identifiant' onChange={handleId_login} />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" placeholder='Mot de passe' onChange={handlePassword_login} />
                            </div>
                            <input type="button" value="Se connecter" className='btn_login' onClick={handleNavigationLogin} />
                            <a href="/forgot-password" target='_blank' id='forgot_password'><h3>Mot de passe oublié ?</h3></a>
                            <p className='social_text'>Ou avec les réseaux sociaux</p>
                            <div className="social_login">
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-twitter"></i>
                                </a>
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>

                        <form action="" className='sign_up_form'>
                            <h2 className='title_login'>S'enregistrer</h2>
                            <div className="input_field">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" placeholder='Identifiant' onChange={handleId_register} />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="text" placeholder='Email' onChange={handleEmail} />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" placeholder='Mot de passe' onChange={handlePassword_register} />
                            </div>
                            <input type="button" value="S'enregistrer" className='btn_login' onClick={handleNavigationRegister} />
                            <p className='social_text'>Ou avec les réseaux sociaux</p>
                            <div className="social_login">
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="" className='social_login_icon'>
                                    <i class="fa-brands fa-twitter"></i>
                                </a>
                                <a href="" className='social_login_icon'>
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
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                                elit. Debitis, ex ratione. Aliquid</p>
                            <button className='btn_login transparent' id='sign-up-btn'>S'enregistrer</button>
                        </div>
                        <img src="media/img/login.png" alt="login_img" className='img_panel' />
                    </div>

                    <div className="panel right_panel">
                        <div className="content_panel">
                            <h3>Déjà chez nous ?</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                                elit. Debitis, ex ratione. Aliquid</p>
                            <button className='btn_login transparent' id='sign-in-btn'>Se connecter</button>
                        </div>
                        <img src="media/img/signup.png" alt="register_img" className='img_panel' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;