import React from 'react';
import TeamMate from '../components/TeamMate';

const TeamPage = () => {
    return (
        <>
            <div className="container_teampage">
                <TeamMate img='1' name='Maxence Bonnici' description='Frontend Developer' link_git='https://github.com/ImMaxence' link_linke='https://www.linkedin.com/in/maxence-bonnici-77b540250/' link_twi='/404' />
                <TeamMate img='2' name='Maxence Laporte' description='Backend Developer' link_git='/404' link_linke='/404' link_twi='/404' />
                <TeamMate img='3' name='Morgan Navarra' description='Frontend Developer' link_git='/404' link_linke='/404' link_twi='/404' />
                <TeamMate img='4' name='Matéo Salvy' description='Deployment' link_git='/404' link_linke='/404' link_twi='/404' />
                <TeamMate img='5' name='Meriem Boussaid' description='Backend Developer' link_git='/404' link_linke='/404' link_twi='/404' />
            </div>
        </>
    );
};

export default TeamPage;