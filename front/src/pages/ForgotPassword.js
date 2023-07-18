import { React, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const ForgotPassword = () => {

    const [eye1, setEye1] = useState(false);
    const [eye2, setEye2] = useState(false);
    const [password_input_1, setPassword1] = useState("");
    const [password_input_2, setPassword2] = useState("");

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

    return (
        <>
            <div className="container_nice_form">
                <div className="form_nice">
                    <div className="title_nice_form">
                        <h1>Modifier son mot de passe</h1>
                    </div>
                    <form action="" className='container_inputs_nice'>
                        <div className="max_width">
                            <div className="input_field">

                                <i onClick={change_eye1} className='slash_eye'>
                                    {eye1 ? (
                                        <AiOutlineEye size={"2rem"} />
                                    ) : (
                                        <AiOutlineEyeInvisible size={"2rem"} />
                                    )}
                                </i>
                                <input type={eye1 ? "text" : "password"} placeholder='Nouveau mot de passe' onChange={handlePassword1} />
                            </div>
                        </div>
                        <div className="max_width">
                            <div className="input_field">
                                <i onClick={change_eye2} className='slash_eye'>
                                    {eye2 ? (
                                        <AiOutlineEye size={"2rem"} />
                                    ) : (
                                        <AiOutlineEyeInvisible size={"2rem"} />
                                    )}
                                </i>
                                <input type={eye2 ? "text" : "password"} placeholder='Confirmer votre mot de passe' onChange={handlePassword2} />
                            </div>
                        </div>
                        <input type="submit" value="Modifier" className='btn_login center_submit' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;