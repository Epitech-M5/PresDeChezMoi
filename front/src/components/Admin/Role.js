import React, { useEffect, useState } from 'react';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../api'
import { useSelector } from "react-redux";
import DropDownBtn from '../MainComponent/DropDownBtn';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';


const Role = () => {
    const { addMessage, removeMessage, messages } = useMessageQueue();

    const utilisateur = useSelector((state) => state.utilisateur);

    const [arrayUser, setArrayUser] = useState([]);
    const [arrayModo, setArrayModo] = useState([]);
    const [arrayAdmin, setArrayAdmin] = useState([]);
    const [arrayBanni, setArrayBanni] = useState([]);

    useEffect(() => {
        actualiseData()
    }, [])

    const actualiseData = () => {
        getAPI(`http://127.0.0.1:8081/api/user/by_ville/${utilisateur.idVille}`, null, { 'x-access-token': utilisateur.token }).then((response) => {
            // console.log("DATA : ", response.dataAPI)
            var arrayLocalAdmin = []
            var arrayLocalModo = []
            var arrayLocalUser = []
            var arrayLocalBanni = []
            for (var n = 0; n < response.dataAPI.length; n++) {
                if (response.dataAPI[n].estBanni == true) {
                    arrayLocalBanni.push(response.dataAPI[n])
                }
                else if (response.dataAPI[n].idRole == 3) {
                    arrayLocalAdmin.push(response.dataAPI[n])
                }
                else if (response.dataAPI[n].idRole == 2) {
                    arrayLocalModo.push(response.dataAPI[n])
                }
                else {
                    arrayLocalUser.push(response.dataAPI[n])
                }
            }
            setArrayUser(arrayLocalUser)
            setArrayBanni(arrayLocalBanni)
            setArrayModo(arrayLocalModo)
            setArrayAdmin(arrayLocalAdmin)
        })
    }

    const handleSupp = (id) => {
        addMessage(`L'utilisateur à bien été supprimé ${id}`, "success")
        deleteAPI(`http://127.0.0.1:8081/api/user/${id}`, null, { "x-access-token": utilisateur.token }).then(() => {
            actualiseData()
        })

    }

    const handleBan = (id) => {
        addMessage("L'utilisateur à bien été banni", "success")
        putAPI(`http://127.0.0.1:8081/api/user/${id}`, { "estBanni": true }, { "x-access-token": utilisateur.token }).then(() => {
            actualiseData()
        })
    }

    const handleUnban = (id) => {
        addMessage("L'utilisateur à bien été débanni", "success")
        putAPI(`http://127.0.0.1:8081/api/user/${id}`, { "estBanni": false }, { "x-access-token": utilisateur.token }).then(() => {
            actualiseData()
        })
    }

    const handleCheckboxChange = (item, user) => {
        console.log(item)
        var role = { "user": 1, "modérateur": 2 }

        console.log(`${user.pseudo} doit être ${role[item]}`)
        putAPI(`http://127.0.0.1:8081/api/user/${user.id}`, { "idRole": role[item] }, { "x-access-token": utilisateur.token }).then((response) => {
            console.log(response)
        }).then(() => {
            actualiseData()
        })

    };

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />

            <div className='content_admin'>
                <div className="container_title_page_admin">
                    <h1>Rôles et utilisateurs</h1>
                </div>
                <div className="content_inside_admin_pages">

                    <div className="container_for_simple_spacing">

                        <div className="wrapper_tab_role">
                            <h1 id='title_role'>Administrateur</h1>
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
                                    {arrayAdmin.map((item) => {
                                        console.log(item.role.titre)
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.pseudo}</td>
                                                <td>{item.role.titre}</td>

                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>

                        <div className="wrapper_tab_role">
                            <h1 id='title_role'>Modérateur</h1>
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
                                    {arrayModo.map((item) => {
                                        console.log(item.role.titre)
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.pseudo}</td>
                                                <td>{item.role.titre}</td>
                                                <td>
                                                    <DropDownBtn type='rela' text={item.role.titre} items={['user', 'modérateur']} onCheckboxChange={(items) => handleCheckboxChange(items, item)} />
                                                </td>

                                                {/* <td><i class="fa-solid fa-hammer" onClick={handleBan}> Bannir</i></td>
                                        <td><i class="fa-solid fa-trash" onClick={handleSupp}> Supprimer</i></td> */}
                                                <td><button onClick={() => handleBan(item.id)}>Bannir</button></td>
                                                <td><button onClick={() => handleSupp(item.id)}>Supprimer</button></td>
                                                {/* <td><i class="fa-solid fa-x" onClick={handleSupp}></i></td> */}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>

                        <div className="wrapper_tab_role">
                            <h1 id='title_role'>Utilisateur</h1>
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
                                    {arrayUser.map((item) => {
                                        console.log(item.role.titre)
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.pseudo}</td>
                                                <td>{item.role.titre}</td>
                                                <td>
                                                    <DropDownBtn type='rela' text={item.role.titre} items={['user', 'modérateur']} onCheckboxChange={(items) => handleCheckboxChange(items, item)} />
                                                </td>
                                                <td><button onClick={() => handleBan(item.id)}>Bannir</button></td>
                                                <td><button onClick={() => handleSupp(item.id)}>Supprimer</button></td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <div className="wrapper_tab_role">
                            <h1 id='title_role'>Banni</h1>
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
                                    {arrayBanni.map((item) => {
                                        console.log(item.role.titre)
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.nom}</td>
                                                <td>{item.prenom}</td>
                                                <td>{item.pseudo}</td>
                                                <td>{item.role.titre}</td>
                                                <td><button onClick={() => handleUnban(item.id)}>Débannir</button></td>
                                                <td><button onClick={() => handleSupp(item.id)}>Supprimer</button></td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>

                    </div>


                </div>
            </div >
        </>
    );
};

export default Role;