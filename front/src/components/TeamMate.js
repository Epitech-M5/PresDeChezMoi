import React from 'react';

const TeamMate = (props) => {

    const path = 'media/img/' + props.img + '.png';
    const git = props.link_git;
    const linkedin = props.link_linke;
    const twitter = props.link_twi;

    return (
        <>
            <div className="profile_card">
                <div className="img_profile">
                    <img src={path} alt="teammate" />
                </div>
                <div className="caption">
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <div className="social_links_team">
                        <a href={git} target='_blank'><i class="fa-brands fa-github"></i></a>
                        <a href={linkedin} target='_blank'><i class="fa-brands fa-linkedin"></i></a>
                        <a href={twitter} target='_blank'><i class="fa-brands fa-twitter"></i></a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamMate;