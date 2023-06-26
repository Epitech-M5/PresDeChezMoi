import React from 'react';
import TeamMate from '../components/TeamMate';

const TeamPage = () => {
    return (
        <>
            <div className="container_teampage">
                <TeamMate img='1' name='Maxence Bonnici' description='Frontend Developer' link_git='' link_linke='' link_twi='' />
                <TeamMate img='2' name='Maxence Laporte' description='Frontend Developer' link_git='' link_linke='' link_twi='' />
                <TeamMate img='3' name='Morgan Navarra' description='Frontend Developer' link_git='' link_linke='' link_twi='' />
                <TeamMate img='4' name='Matéo Salvy' description='Frontend Developer' link_git='' link_linke='' link_twi='' />
                <TeamMate img='5' name='Meriem Boussaid' description='Frontend Developer' link_git='' link_linke='' link_twi='' />
            </div>
        </>
    );
};

export default TeamPage;