import { React, useState, useRef } from 'react';
import MessageQueue, { useMessageQueue } from '../components/MessageQueue.js';
import emailjs from 'emailjs-com';

const ContactPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const form = useRef();

    const handleSubmitEmail = (e) => {

        e.preventDefault();

        if (name.length <= 0 || email.length <= 0 || subject.length <= 0 || message.length <= 0) {
            addMessage('Tous les champs doivent être remplis', 'info');
        }

        else {
            addMessage('Votre message à bien été envoyé', 'success');

            // 200 email par mois, id : presdechezmoi.email@gmail.com mdp : 123Azerty# 
            emailjs.sendForm('service_jnx8o0c', 'template_zal9dbd', form.current, 'AHMnZTYTrMKEh55qV')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
    }

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className="container_nice_form">
                <div className="form_nice max-height">
                    <div className="contact_form_title">
                        <h1>Nous contacter</h1>
                    </div>
                    <form action="" ref={form} className='contact_form' onSubmit={handleSubmitEmail}>
                        <div className="max_width">
                            <div className="input_field">
                                <i className="fa-solid fa-user"></i>
                                <input type='text' placeholder='Votre nom' name='name' onChange={(event) => setName(event.target.value)} />
                            </div>
                        </div>
                        <div className="max_width">
                            <div className="input_field">
                                <i className="fa-solid fa-envelope"></i>
                                <input type='email' placeholder='Votre Email' name='email' onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>
                        <div className="max_width" id='subject_to_delete'>
                            <div className="input_field">
                                <i className="fa-solid fa-bullseye"></i>
                                <input type='text' placeholder='Sujet' name='subject' onChange={(event) => setSubject(event.target.value)} />
                            </div>
                        </div>
                        <div className="max_width">
                            <div className="input_field" id='textarea_contact'>
                                <i class="fa-solid fa-message"></i>
                                <textarea placeholder='Message' name='message' onChange={(event) => setMessage(event.target.value)}></textarea>
                            </div>
                        </div>
                        <input type="submit" value="Envoyer" className='btn_login center_submit' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;