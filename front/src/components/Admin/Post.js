import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = () => {

    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        setActiveId(1);
    }, []);

    const toggleUnderline = (id) => {
        setActiveId(id);
    }

    const handleToggle = () => {

        const toggleBtnIcon = document.querySelector('.container_forphone_responsive_admin i')
        const ToSlide = document.querySelector('.navbar_toslide_responsive_admin')
        ToSlide.classList.toggle('open')

        const isOpen = ToSlide.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-270' : 'fa-solid fa-greater-than fa-rotate-90'
    }

    return (
        <>
            <div className='content_admin'>
                <div className="content_inside_admin_pages">
                    <div className="container_toggle_for_posts">

                        <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(1)}>Annonces signalées</h1>

                        <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(2)}>Annonces à valider</h1>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Post;