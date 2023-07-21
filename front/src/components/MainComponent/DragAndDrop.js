import React, { useState } from 'react';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';

const DragAndDrop = ({ onFileDrop }) => {

    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);

    const { addMessage, removeMessage, messages } = useMessageQueue();

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
                        <h4>Document drop :</h4>
                        <p>{file.name}</p>
                    </div>
                ) : (
                    <p>Drop un fichier ici !</p>
                )}
            </div>
        </>
    );
};

export default DragAndDrop;