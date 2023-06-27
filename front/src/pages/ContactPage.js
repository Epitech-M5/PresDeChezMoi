import { React, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ContactPage = () => {

    return (
        <>
            <div className="container_nice_form">
                <div className="form_nice max-height">
                    <div className="contact_form_title">
                        <h1>Nous contacter</h1>
                    </div>
                    <form action="" className='contact_form'>
                        <div className="max_width">
                            <div className="input_field">
                                <i className="fa-solid fa-user"></i>
                                <input type='text' placeholder='Votre nom' />
                            </div>
                        </div>
                        <div className="max_width">
                            <div className="input_field">
                                <i className="fa-solid fa-envelope"></i>
                                <input type='email' placeholder='Votre Email' />
                            </div>
                        </div>
                        <div className="max_width" id='subject_to_delete'>
                            <div className="input_field">
                                <i className="fa-solid fa-bullseye"></i>
                                <input type='text' placeholder='Sujet' />
                            </div>
                        </div>
                        <div className="max_width">
                            <div className="input_field" id='textarea_contact'>
                                <i class="fa-solid fa-message"></i>
                                <textarea placeholder='Message'></textarea>
                            </div>
                        </div>
                        <input type="submit" value="Envoyer" className='btn_login' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;