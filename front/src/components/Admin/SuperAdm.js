import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdm = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="container_superadm">
                <div className="container_title_superadm">
                    <h1>Bienvenue sur la page Super Admin !</h1>
                </div>
                <div className="wrapper_superadm">
                    <div className="container_left_superadm">
                        <h1>Administrateur</h1>
                        <button onClick={() => navigate('/super-admin/add-admin')}>Nommer administrateur</button>
                        <button onClick={() => navigate('/super-admin/modif-admin')}>Modifier administrateur</button>
                    </div>
                    <div className="container_right_superadm">
                        <h1>Ville</h1>
                        <button onClick={() => navigate('/super-admin/add-city')}>Créer ville</button>
                        <button onClick={() => navigate('/super-admin/modif-city')}>Modifier ville</button>
                    </div>
                    <div className="container_right_superadm deco">
                        <h1>Déconnexion</h1>
                        <button onClick={() => window.location.reload()}>Page de connexion</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SuperAdm;