import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {

    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (!isOpen && isClosing) {
            setIsClosing(false);
        }
    }, [isOpen, isClosing]);

    if (!isOpen) return null;

    const handleModalClick = (event) => {
        if (event.target.classList.contains('modal')) {
            setIsClosing(true);
            setTimeout(() => {
                onClose();
            }, 300);
        }
    };

    if (!isOpen && !isClosing) return null;

    return (
        <>
            <div className={`modal ${isClosing ? 'closing' : ''}`} onClick={handleModalClick}>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;