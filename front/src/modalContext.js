import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const modalContextValues = {
        isOpen,
        openModal,
        closeModal,
    };

    return (
        <ModalContext.Provider value={modalContextValues}>
            {children}
        </ModalContext.Provider>
    );
}