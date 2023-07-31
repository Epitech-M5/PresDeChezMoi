import React, { useEffect, useState } from 'react';
// import { getAPI, postAPI, putAPI, deleteAPI } from '../../api.js'
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
// import { useSelector } from "react-redux";

const ToggleBtn = ({ toggled, onToggle }) => {

    const [isToggled, toggle] = useState(toggled)
    const { addMessage, removeMessage, messages } = useMessageQueue();

    useEffect(() => {
        toggle(toggled);
        console.log('DDDDDDDDDDDDDDDDDDDMMM : ' + toggled)
    }, [toggled]);

    const handleToggle = () => {
        onToggle(!toggled);
    };

    return (<>
        <MessageQueue messages={messages} removeMessage={removeMessage} />
        <label className='toggle_btn_label'>
            <input className='toggle_btn_input' type="checkbox" checked={toggled} onChange={handleToggle} />
            <span className='toggle_btn_span' />
        </label>
    </>
    )
};

export default ToggleBtn;