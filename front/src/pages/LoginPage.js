import { React, useEffect } from 'react';

const LoginPage = () => {

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
            <div className="container_loginpage">
                <div className="forms_container">
                    <div className="signin_signup">

                        <form action="" className='sign_in_form'>
                            <h2 className='title_login'>Se connecter</h2>
                            <div className="input_field">
                                <i class="fa-solid fa-user"></i>
                                <input type="text" placeholder='Identifiant' />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" placeholder='Mot de passe' />
                            </div>
                            <input type="submit" value="Se connecter" className='btn_login' />
                            <a href="/404" target='_blank' id='forgot_password'><h3>Mot de passe oublié ?</h3></a>
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
                                <input type="text" placeholder='Identifiant' />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-envelope"></i>
                                <input type="text" placeholder='Email' />
                            </div>
                            <div className="input_field">
                                <i class="fa-solid fa-lock"></i>
                                <input type="password" placeholder='Mot de passe' />
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