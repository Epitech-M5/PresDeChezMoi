import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleModalClick = (event) => {

        if (event.target.classList.contains('modal')) {
            event.target.classList.add('closing');
            setTimeout(() => {
                onClose();
            }, 300);
        }
    };

    return (
        <div className="modal" onClick={handleModalClick}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;