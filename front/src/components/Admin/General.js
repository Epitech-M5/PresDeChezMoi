import React, { useState } from 'react';
import DragAndDrop from '../MainComponent/DragAndDrop';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import ToggleBtn from '../MainComponent/ToggleBtn';

const General = () => {

    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [numb, setNumb] = useState('');

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const updateFile = (droppedFile) => {
        setFile(droppedFile.name);

        console.log('file 2 : ' + droppedFile.name)
    };

    console.log(file)

    const handleSubmit = () => {

        if (name === '' || numb === '' || file === null) {
            addMessage('Les champs Nom, Nombre et Image doivent être remplies', 'info')
        }

        else {
            console.log('submit data')
        }

    };

    const Toggle = (state) => {
        console.log(state);
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
                        <input type="text" placeholder='Nom récompense' className='input_rec_text' onChange={(event) => setName(event.target.value)} />
                        <input type="number" placeholder='Nombre de point' className='input_rec_number' onChange={(event) => setNumb(event.target.value)} />
                    </div>
                    <DragAndDrop onFileDrop={updateFile} />
                    <input className='input_rec' type="button" value='Envoyer !' onClick={handleSubmit} />

                    <div className="space_hr_adm">
                        <hr />
                    </div>

                    <div className="wrapper_chat_ville">
                        <ToggleBtn toggled={false} onClick={Toggle} />
                        <h1>Créer un chat de ville</h1>
                    </div>

                </div>
            </div>
        </>
    );
};

export default General;