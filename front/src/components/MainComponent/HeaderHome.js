import { React } from 'react';
import UserMenu from './UserMenu';


const HeaderHome = () => {

    return (
        <>
            <header>
                <div className="header">
                    <div className="header__logo">
                        <img src="media/img/carotte.png" alt="logo" />
                        <h1>PresDeChezMoi</h1>
                    </div>
                    <div className="header__search">
                        <input type="text" placeholder="Rechercher un produit, un producteur..." />
                        <button>Rechercher</button>
                    </div>
                    <UserMenu image="https://cdn-icons-png.flaticon.com/512/802/802287.png" />
                </div>
            </header>
        </>
    );
};

export default HeaderHome;