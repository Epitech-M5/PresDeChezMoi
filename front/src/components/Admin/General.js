import React, { useEffect, useState } from 'react';
import DragAndDrop from '../MainComponent/DragAndDrop';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import ToggleBtn from '../MainComponent/ToggleBtn';
// import { getAPI, postAPI, putAPI, deleteAPI } from '../../api'
import { useSelector } from 'react-redux';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../api.js'
// import { useSelector } from "react-redux";



const General = () => {
    const utilisateur = useSelector((state) => state.utilisateur);
    const user = useSelector((state) => state.utilisateur);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [numb, setNumb] = useState('');
    const [isPresent, setIsPresent] = useState(null);
    const [arrayUser, setArrayUser] = useState([]);

    var [toggleValue, setToggleValue] = useState(null);

    // var toggleValue = false

    useEffect(() => {

        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD : ' + toggleValue)

    }, [toggleValue])


    useEffect(() => {
        console.log("code postal", user.idVille)
        console.log("code postal", user.token)
        console.log("code postal", user)


        var header = {
            "x-access-token": user.token
        }
        getAPI(`http://127.0.0.1:8081/api/room/ville/${user.idVille}`, null, header).then((response) => {

            console.log("@@@@@@@@", response.dataAPI[0])
            console.log("@@@@@@@@", response.dataAPI.length)

            if (response.dataAPI.length > 0) {
                console.log('on passe bien dans le if')
                setToggleValue(true);
                console.log('toggle value : ' + toggleValue) // VALUE IS FALSE WHY
            }
            else {
                console.log('on passe bien dans le ELSE')
                setToggleValue(false);
                console.log('toggle value : ' + toggleValue)
            }
        })

    }, []);



    const { addMessage, removeMessage, messages } = useMessageQueue();

    const updateFile = (droppedFile) => {
        setFile(droppedFile.name);

        console.log('file 2 : ' + droppedFile.name)
    };

    //console.log(file)

    const handleSubmit = () => {

        if (name === '' || numb === '' || file === null) {
            addMessage('Les champs Nom, Nombre et Image doivent être remplies', 'info')
        }

        else {

            var body = {
                "nom": name,
                "image": file,
                "idVille": user.idVille,
                "scoreNecessaire": numb
            }
            console.log(body)
            var header = {
                "x-access-token": user.token
            }
            postAPI("http://127.0.0.1:8081/api/recompense/", body, header).then((response) => {
                addMessage('Récompense ajouté en base de donnée', 'success')
                setFile(null)
                setNumb('')
                setName('')
                console.log()
                updateFile(file)
            })
                .catch((error) => {
                    addMessage(error, 'error')
                });
        }
    };

    const Toggle = (state) => {
        console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDd : ' + state)
        console.log("TOOKEN : ", utilisateur.token)
        console.log("IDVILLLE : ", utilisateur.idVille)
        // getAPI('http://127.0.0.1:8081/api/user/by_ville', { "idVille": utilisateur.idVille }, { "x-access-token": utilisateur.token })

        getAPI(`http://127.0.0.1:8081/api/user/by_ville/${utilisateur.idVille}`, null, { 'x-access-token': utilisateur.token })
            .then((response) => {
                for (var n = 0; n < response.dataAPI.length; n++) {
                    setArrayUser(arrayUser => [...arrayUser, response.dataAPI[n].pseudo]);
                }
            })
        console.log("ICIIIIIIII", arrayUser)
        getAPI(`http://127.0.0.1:8081/api/room/ville/${utilisateur.idVille}`, null, { 'x-access-token': utilisateur.token })
            .then((response) => {
                console.log('TESTTTT REQUETE :', state)
                // if (state) {
                //     if (response.dataAPI.length > 0) {
                //         addMessage('Already exist', 'error')
                //     }
                //     else {
                //         postAPI("http://127.0.0.1:8081/api/room/", { "membres": arrayUser, "idVille": utilisateur.idVille }, { 'x-access-token': utilisateur.token }).then((response) => {
                //             addMessage('OK', 'success')
                //         })
                //     }
                // }
                // else {
                //     console.log("RRRRRRRRRRRRRRRRRRrr")
                //     if (response.dataAPI.length == 0) {
                //         addMessage('None exist', 'error')
                //     }
                //     else {
                //         console.log("GGGGGGGGGGGGGGGGGGGGGG")
                //         deleteAPI(`http://127.0.0.1:8081/api/room/${utilisateur.idVille}`, null, { 'x-access-token': utilisateur.token }).then((response) => {
                //             addMessage('OK', 'success')
                //         })
                //     }

                // }
            }).catch((error) => { console.log(error) })


        //     console.log("AAAAAAAAAAAAAAAAAAaaaaaaaa", response.dataAPI.length > 0)
        //     if (state) {
        //         if (response.dataAPI.length > 0) {
        //             addMessage('Already exist', 'error')
        //         }
        //         else {
        //             postAPI("http://127.0.0.1:8081/api/room/", null, { 'x-access-token': utilisateur.token }).then((response) => {
        //                 addMessage('OK', 'success')
        //             })
        //         }
        //     }
        //     else {
        //         if (response.dataAPI.length == 0) {
        //             addMessage('None exist', 'error')
        //         }
        //         else {
        //             deleteAPI(`http://{{$ip}}:8081/api/room/${utilisateur.idVille}`, null, { 'x-access-token': utilisateur.token }).then((response) => {
        //                 addMessage('OK', 'success')
        //             })
        //         }

        //     }
        // }) // All user for this city


        console.log('default value : ' + state);
    }

    const handleRec = (event) => {
        setName(event.target.value);
        console.log('NAME : ' + name);
    }

    const handlePoint = (event) => {
        setNumb(event.target.value);
        console.log('POINT : ' + numb);
    }

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className='content_admin'>
                <div className="container_title_page_admin">
                    <h1>Réglagle Général</h1>
                </div>
                <div className="content_inside_admin_pages">

                    <h1>Ajouter une récompenses (PNG / JPG):</h1>
                    <div className="wrapper_inputs_rec">
                        <input type="text" placeholder='Nom récompense' className='input_rec_text' value={name} onChange={handleRec} />
                        <input type="number" placeholder='Nombre de point' className='input_rec_number' value={numb} onChange={handlePoint} />
                    </div>
                    <DragAndDrop onFileDrop={updateFile} fileProps={file} />
                    <input className='input_rec' type="button" value='Envoyer !' onClick={handleSubmit} />

                    <div className="space_hr_adm">
                        <hr />
                    </div>

                    <div className="wrapper_chat_ville">
                        <ToggleBtn toggled={toggleValue} onClick={Toggle} />
                        <h1>Créer un chat de ville</h1>
                    </div>

                </div>
            </div>
        </>
    );
};

export default General;