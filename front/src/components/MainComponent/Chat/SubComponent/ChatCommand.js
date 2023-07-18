import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

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
          placeholder="Send Message Here"
          onKeyDown={handleKeyDown} // Gestionnaire d'événements pour la touche "Entrée"
        />
        <button type="submit">
          <FiSend className="chat_btn_send"/>
        </button>

        {/* <div className="chat_input_foot">
          <label htmlFor="imageInput" className="chat_import">
            <span className="chat_import_image">
              {selectedFileName ? (
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
          </label>
        </div> */}
      </form>
    </div>
  );
};

export default ChatCommand;
