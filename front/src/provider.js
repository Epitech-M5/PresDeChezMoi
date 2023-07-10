import { React, useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function useMessageQueue() {

    const [messages, setMessages] = useState([]);

    const ref = useRef();
    ref.current = messages;

    function addMessage(caption, type = 'info', timeout = 5000) {
        const id = uuidv4();
        setMessages([
            {
                id,
                type,
                caption,
                timeout: setTimeout(() => {
                    removeMessage(id);
                }, timeout)
            }
            , ...messages,
        ]);
    }

    function removeMessage(id) {
        setMessages(ref.current.filter((msg) => msg.id !== id));
    }

    return { addMessage, removeMessage, messages }
}