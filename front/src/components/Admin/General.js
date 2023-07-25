import React, { useEffect, useState } from 'react';
import DragAndDrop from '../MainComponent/DragAndDrop';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import ToggleBtn from '../MainComponent/ToggleBtn';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../api.js';
import { useSelector } from 'react-redux';

const General = () => {

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [numb, setNumb] = useState('');
    const [updateDragAndDrop, setUpdateDragAndDrop] = useState(false);
    const [updateToggle, setUpdateToggle] = useState(false);
    const [arrayUser, setArrayUser] = useState([]);

    const user = useSelector((state) => state.utilisateur);

    const { addMessage, removeMessage, messages } = useMessageQueue();

    useEffect(() => {
        console.log("id ville", user.idVille)
        console.log("user token", user.token)
        console.log("user", user)

        // getAPI(`http://127.0.0.1:8081/api/room/ville/${user.idVille}`, {}, { "x-access-token": user.token }).then((response) => {

        //     console.log(response)

        //     if (response.dataAPI.length > 0) {
        //         // mettre le boutton toggle sur true
        //     }
        //     else {
        //         // sinon le mettre sur false
        //     }
        // })

        setUpdateToggle(true)

    }, []);

    const updateFile = (droppedFile) => {
        if (droppedFile) {
            setFile(droppedFile);
        }
    };

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

            var header = {
                "x-access-token": user.token
            }
            postAPI("http://127.0.0.1:8081/api/recompense/", body, header)
                .then((response) => {
                    addMessage('Récompense ajouté en base de donnée', 'success');
                })
                .catch((error) => {
                    addMessage(error, 'error')
                });

            setFile(null)
            setNumb('')
            setName('')
            setUpdateDragAndDrop(true);
        }

    };



    // await getAPI(`http://127.0.0.1:8081/api/user/by_ville/${user.idVille}`, null, { 'x-access-token': user.token })
    //     .then((response) => {
    //         console.log(response);
    //         for (var n = 0; n < response.dataAPI.length; n++) {
    //             setArrayUser(arrayUser => [...arrayUser, response.dataAPI[n].pseudo]);
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // console.log(arrayUser);


    const handleRec = (event) => {
        setName(event.target.value);
    }

    const handlePoint = (event) => {
        setNumb(event.target.value);
    }

    const handleToggle = (state) => {
        console.log(state);
        setUpdateToggle(state);
    };

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
                    <DragAndDrop onFileDrop={updateFile} updateDragAndDrop={updateDragAndDrop} />
                    <input className='input_rec' type="button" value='Envoyer !' onClick={handleSubmit} />

                    <div className="space_hr_adm">
                        <hr />
                    </div>

                    <div className="wrapper_chat_ville">
                        <ToggleBtn toggled={updateToggle} onToggle={handleToggle} />
                        <h1>Créer un chat de ville</h1>
                    </div>

                </div>
            </div>
        </>
    );
};

export default General;