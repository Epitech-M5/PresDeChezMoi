import { React, useEffect, useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    // Gère redirection route
    // Connexion
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [identifiant, setIdentifiant] = useState()
    const [identifiantInscription, setIdentifiantInscription] = useState()
    const [emailInscription, setEmailInscription] = useState()
    const [passwordInscription, setPasswordInscription] = useState()
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

    // A l'envoie du formulaire
    const handleSubmit_inscription = e => {
        // Prevent the default envoie du form
        e.preventDefault()
    
        // Envoie données au back
        axios
          .post("http://127.0.0.1:8081/api/user/auth/signup", { "pseudo":identifiantInscription, "mail":emailInscription, "motDePasse":passwordInscription, "idRole":2 })
          .then(response => {
            navigate('/home');
            console.log(response)
            
          }).catch(error=>{
            console.log("error", error);
          })
      }
    // A l'envoie du formulaire
    const handleSubmit_connexion = e => {
        // Prevent the default envoie du form
        e.preventDefault()
    
        // Envoie données au back
        axios
          .post("http://127.0.0.1:8081/api/user/auth/signin", { "pseudo":identifiant, "motDePasse":password })
          .then(response => {
            navigate('/home');
            console.log(response)
            
          }).catch(error=>{
            console.log("error", error);
          })
      }
      

    return (
        <>
            <div className="container_loginpage">
                <div className="forms_container">
                    <div className="signin_signup">
                        <form action="" className='sign_in_form' onSubmit={handleSubmit_connexion}> 
                            <h2 className='title_login'>Se connecter</h2>
                            <div className="input_field">
                                <i class="fa-solid fa-user"></i>
                                <input 
                                    type="text" 
                                    name="id_connexion" 
                                    placeholder='Identifiant' 
                                    value={identifiant}
                                    onChange={e => setIdentifiant(e.target.value)}
                                    />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-lock"></i>
                                <input 
                                    type="password" 
                                    name="mdp_connexion" 
                                    placeholder='Mot de passe' 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}                                   
                                    />
                            </div>
                            <input type="submit" value="Se connecter" className='btn_login' />
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

                        <form action="" className='sign_up_form' onSubmit={handleSubmit_inscription}>
                            <h2 className='title_login'>S'enregistrer</h2>
                            <div className="input_field">
                                <i class="fa-solid fa-user"></i>
                                <input 
                                type="text" 
                                name="pseudo" 
                                placeholder='pseudo' 
                                value={identifiantInscription}
                                onChange={e => setIdentifiantInscription(e.target.value)}
                                />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-envelope"></i>
                                <input 
                                    type="text" 
                                    name="mail" 
                                    placeholder='Email'
                                    value={emailInscription}
                                    onChange={e => setEmailInscription(e.target.value)}
                                    />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-lock"></i>
                                <input 
                                    type="password" 
                                    name="motDePasse" 
                                    placeholder='Mot de passe' 
                                    value={passwordInscription}
                                    onChange={e => setPasswordInscription(e.target.value)} 
                                    />
                            </div>
                            <input type="submit" value="S'enregistrer" className='btn_login' />
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