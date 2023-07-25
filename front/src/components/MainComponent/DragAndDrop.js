import React, { useEffect, useState } from 'react';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';

const DragAndDrop = ({ onFileDrop, updateDragAndDrop }) => {

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : " + onFileDrop)

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);

    const { addMessage, removeMessage, messages } = useMessageQueue();

    useEffect(() => {
        if (updateDragAndDrop) {
            setFile(null);
            onFileDrop(null);
        }
    }, [updateDragAndDrop]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && (droppedFile.type === 'image/jpeg' || droppedFile.type === 'image/png')) {
            setFile(droppedFile);
            onFileDrop(droppedFile);
        }
        else {
            addMessage('Les fichiers supportés sont .png et .jpg', 'info');
        }
    };

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
            setFile(selectedFile);
            onFileDrop(selectedFile);
        } else {
            addMessage('Les fichiers supportés sont .png et .jpg', 'info');
        }
    };

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div
                className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {file ? (
                    <div>
                        <h4>Nom fichier : {file.name}</h4>
                        <input id='file' type="file" accept=".png,.jpg,.jpeg" className='inputfile admin' onChange={handleFileInputChange} />
                        <label for="file">Ou sélectionne un fichier</label>
                    </div>
                ) : (
                    <>
                        <p>Drop un fichier ici</p>
                        <input id='file' type="file" accept=".png,.jpg,.jpeg" className='inputfile admin' onChange={handleFileInputChange} />
                        <label for="file">Ou sélectionne un fichier</label>
                    </>
                )}
            </div>
        </>
    );
};

export default DragAndDrop;