import React from 'react';
import Notifications from './Notifications';

export { default as useMessageQueue } from '../provider';

const MessageQueue = ({ messages = [], removeMessage }) => {
    return (
        <>
            <div className="container_message_queu">
                {messages.map((msg) => (
                    <Notifications key={msg.id} message={msg} removeMessage={removeMessage} />
                ))}
            </div>
        </>
    );
};

export default MessageQueue;