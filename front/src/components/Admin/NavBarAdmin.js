import { React, useState, useEffect } from 'react';
import { Provider, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const NavBarAdmin = () => {

    const [activeId, setActiveId] = useState(null);

    const navigate = useNavigate();

    const user = useSelector((state) => state.utilisateur);

    const handleToggle = () => {

        const toggleBtnIcon = document.querySelector('.container_forphone_responsive_admin i')
        const ToSlide = document.querySelector('.navbar_toslide_responsive_admin')
        ToSlide.classList.toggle('open')

        const isOpen = ToSlide.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-270' : 'fa-solid fa-greater-than fa-rotate-90'
    }

    const toggleUnderline = (id) => {
        setActiveId(id);

        switch (id) {
            case 1:
                handleToggle();
                navigate('/home/administration')
                break
            case 2:
                handleToggle();
                navigate('/home/administration/role-user')
                break
            case 3:
                handleToggle();
                navigate('/home/administration/post')
                break
            case 4:
                handleToggle();
                navigate('/home/administration/tickets')
                break
            case 5:
                handleToggle();
                navigate('/home/administration/notif-event')
                break
        }

    };

    useEffect(() => {
        setActiveId(1);
    }, []);

    return (
        <>
            <div className="container_navbar_admin">
                <div className="container_left_tofrombottom">
                    <div className="container_title_admin">
                        <h1>Page Administration</h1>
                    </div>
                    <div className="container_admin_admin">
                        <img src={`${user.pathImage}`} alt="logo" />
                        <h4>Bienvenue @{user.pseudo}</h4>
                    </div>
                    <div className="container_page_admin">
                        <div className="align_wrap">
                            <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                                onClick={() => toggleUnderline(1)}>Réglage général</h1>
                        </div>
                        <div className="align_wrap">
                            <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                                onClick={() => toggleUnderline(2)}>Rôles et utilisateurs</h1>
                        </div>
                        <div className="align_wrap">
                            <h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                                onClick={() => toggleUnderline(3)}>Filtrage annonces</h1>
                        </div>
                        <div className="align_wrap">
                            <h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                                onClick={() => toggleUnderline(4)}>Tickets via chat</h1>
                        </div>
                        <div className="align_wrap">
                            <h1 className={`underline-animation ${activeId === 5 ? 'underline' : ''}`}
                                onClick={() => toggleUnderline(5)}>Notifications évènements</h1>
                        </div>
                    </div>
                    <div className="container_page_admin_forphone">
                        <div className="align_wrap">
                            <i className={`fa-solid fa-gear underline-animation_logo ${activeId === 1 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(1)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-user underline-animation_logo ${activeId === 2 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(2)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-signs-post underline-animation_logo ${activeId === 3 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(3)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-ticket-simple underline-animation_logo ${activeId === 4 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(4)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-calendar-days underline-animation_logo ${activeId === 5 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(5)}></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container_forphone_responsive_admin" onClick={handleToggle}>
                <i class="fa-solid fa-greater-than fa-rotate-90"></i>
            </div>
            <div className='navbar_toslide_responsive_admin'>
                <div className="toslide_content_responsive_admin">
                    <div className="container_admin_admin">
                        <img src="media/img/1.png" alt="logo" />
                        <h4>Bienvenue @{user.pseudo}</h4>
                    </div>
                    <div className="container_page_admin_forphone">
                        <div className="align_wrap">
                            <i className={`fa-solid fa-gear underline-animation_logo ${activeId === 1 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(1)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-user underline-animation_logo ${activeId === 2 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(2)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-signs-post underline-animation_logo ${activeId === 3 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(3)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-ticket-simple underline-animation_logo ${activeId === 4 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(4)}></i>
                        </div>
                        <div className="align_wrap">
                            <i className={`fa-solid fa-calendar-days underline-animation_logo ${activeId === 5 ? 'underline logo admin' : ''}`}
                                onClick={() => toggleUnderline(5)}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBarAdmin;