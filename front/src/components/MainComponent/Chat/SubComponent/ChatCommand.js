import React, { useState } from "react";
//import { AiFillFileImage, FiSend } from "react-icons/ai";

const ChatCommand = ({
  message,
  setMessage,
  handleImportImage,
  sendMessage,
}) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    const messageData = {
      receive: false,
      message: message,
      time: new Date(),
      image: null,
    };

    sendMessage(messageData);
    setMessage("");
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    handleImportImage(selectedImage);
    setSelectedFileName(selectedImage.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Empêche le saut de ligne
      handleSubmit(e);
    }
  };

  return (
    <div className="chat_command">
      <form onSubmit={handleSubmit} className="chat_foot">
        <textarea
          value={message}
          className="inputText"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Gestionnaire d'événements pour la touche "Entrée"
        />

        <div className="chat_input_foot">
          {/* <label htmlFor="imageInput" className="chat_import">
            <span className="chat_import_image">
              {selectedFileName ? (git puh
                selectedFileName
              ) : (
                <>
                  <AiFillFileImage />
                </>
              )}
            </span>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label> */}

          <button type="submit" className="chat_btn_send">
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatCommand;