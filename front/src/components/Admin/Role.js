import React, { useEffect, useState } from 'react';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../api'
import { useSelector } from "react-redux";
import DropDownBtn from '../MainComponent/DropDownBtn';


const Role = () => {
    const utilisateur = useSelector((state) => state.utilisateur);

    const [arrayUser, setArrayUser] = useState([]);

    useEffect(() => {
        getAPI(`http://127.0.0.1:8081/api/user/by_ville/${utilisateur.idVille}`, null, { 'x-access-token': utilisateur.token }).then((response) => {
            console.log("DATA : ", response.dataAPI)
            setArrayUser(response.dataAPI)
        })
    }, [])

    const handleCheckboxChange = (item, user) => {
        console.log(item)
        var role = { "user": 1, "modérateur": 2 }

        console.log(`${user.pseudo} doit être ${role[item]}`)
        putAPI(`http://127.0.0.1:8081/api/user/${user.id}`, { "idRole": role[item] }, { "x-access-token": utilisateur.token }).then((response) => {
            console.log(response)
        })
    };

    return (
        <>
            <div className='content_admin'>
                <div className="container_title_page_admin">
                    <h1>Rôles et utilisateurs</h1>
                </div>
                <div className="content_inside_admin_pages">
                    <table>
                        <thead>
                            <tr>
                                <th >Nom</th>
                                <th >Prénom</th>
                                <th >Pseudo</th>
                                <th >Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrayUser.map((user) => {
                                console.log(user.role.titre)
                                return (
                                    <tr key={user.id}>
                                        <td>{user.nom}</td>
                                        <td>{user.prenom}</td>
                                        <td>{user.pseudo}</td>
                                        <td>{user.role.titre}</td>
                                        <td>
                                            <DropDownBtn text={user.role.titre} items={['user', 'modérateur']} onCheckboxChange={(item) => handleCheckboxChange(item, user)} />
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>

                </div>
            </div>
        </>
    );
};

export default Role;