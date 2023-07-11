import { React } from 'react';
import UserMenu from '../components/MainComponent/UserMenu'
import NavBarHome from '../components/MainComponent/NavBarHome';

const Home = () => {

    return (
        <>
            <section className="main_container_home">
                <section className='container_1_home'>
                    <h1>premier container, pour la navbar dans app.js</h1>
                </section>

                <section className='container_2_home'>
                    <h1>barre de recherche et feed ici</h1>
                </section>

                <section className='container_3_home'>
                    <h1>pub, evenement, autre ...</h1>
                </section>
            </section>
        </>
    );
};

export default Home;