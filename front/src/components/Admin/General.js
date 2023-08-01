import React, { useEffect, useState } from 'react';
import DragAndDrop from '../MainComponent/DragAndDrop';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import ToggleBtn from '../MainComponent/ToggleBtn';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../api.js';
import { useSelector } from 'react-redux';

async function getAllPeopleByCity(idVille, token) {
    var response = await getAPI(`http://127.0.0.1:8081/api/user/by_ville/${idVille}`, {}, { "x-access-token": token })
    // console.log(response.dataAPI)
    var arrayUser = []
    for (var n = 0; n < response.dataAPI.length; n++) {
        arrayUser.push(response.dataAPI[n].pseudo)
    }
    return arrayUser
}
async function getRoomByCity(idVille, token) {
    var response = await getAPI(`http://127.0.0.1:8081/api/room/ville/${idVille}`, {}, { "x-access-token": token })
    // console.log(response, "   |   ", response.dataAPI.length)
    if (response.dataAPI.length == 0) {
        return { isRoomExist: false, id: null }
    }
    else {
        console.log("AAAAAAAAAAA:", response.dataAPI[0])
        return { isRoomExist: true, id: response.dataAPI[0].id }
    }
}
async function createRoomByCity(idVille, token, data) {
    return await postAPI(`http://127.0.0.1:8081/api/room/`, { "membres": data, "idVille": idVille }, { "x-access-token": token })
}
async function deleteRoomById(idRoom, token) {
    return await deleteAPI(`http://127.0.0.1:8081/api/room/${idRoom}`, {}, { "x-access-token": token })
}

const General = () => {

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [numb, setNumb] = useState('');
    const [updateToggle, setUpdateToggle] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    const user = useSelector((state) => state.utilisateur);

    const { addMessage, removeMessage, messages } = useMessageQueue();

    useEffect(() => {

        getAPI(`http://127.0.0.1:8081/api/room/ville/${user.idVille}`, {}, { "x-access-token": user.token }).then((response) => {

            if (response.dataAPI.length > 0) {
                setUpdateToggle(true)
            }
            else {
                setUpdateToggle(false)
            }
        })

    }, []);

    const handleToggle = async (state) => {

        setUpdateToggle(state);

        console.log("UPDATE TOGGLE BEFORE", updateToggle)
        // console.log("FIRST TIME BEFORE", firstTime)
        console.log("STATE", state);

        var data = await getRoomByCity(user.idVille, user.token)
        var isRoomExist = data.isRoomExist
        var idRoom = data.id
        console.log("VALUEE ROOM EXIST :", isRoomExist)
        console.log("NEED SUP ID :", idRoom)

        if (state === true) {
            if (isRoomExist) {
                addMessage("Un groupe existe déjà pour cette ville", "error")
            }
            else {
                addMessage("Création d'un groupe pour la ville en cours", "success")
                var data = await getAllPeopleByCity(user.idVille, user.token)
                await createRoomByCity(user.idVille, user.token, data)
            }
        }

        else if (state === false) {

            if (isRoomExist) {
                addMessage("Suppression du groupe de la ville en cours", "success")
                deleteRoomById(idRoom, user.token)
            }
            else {
                addMessage("Aucun groupe n'a été trouvé pour cette ville", "error")
            }
        }

        else {
            addMessage("Erreur technique", "warning")
        }
    };

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

            console.log(name, file.name, numb)

            var body = {
                "nom": name,
                "image": file.name,
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

            setFile(null);
            setNumb('');
            setName('');
        }

    };

    const handleRec = (event) => {
        setName(event.target.value);
    }

    const handlePoint = (event) => {
        setNumb(event.target.value);
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
                    <DragAndDrop onFileDrop={updateFile} up={file} />
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