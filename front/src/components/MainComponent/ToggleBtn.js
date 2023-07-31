import React, { useEffect, useState } from 'react';
// import { getAPI, postAPI, putAPI, deleteAPI } from '../../api.js'
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
// import { useSelector } from "react-redux";

const ToggleBtn = ({ toggled, onClick }) => {
    // const utilisateur = useSelector((state) => state.utilisateur);

    const [isToggled, toggle] = useState(toggled)
    const { addMessage, removeMessage, messages } = useMessageQueue();

    useEffect(() => {
        toggle(toggled);
        console.log('DDDDDDDDDDDDDDDDDDDMMM : ' + toggled)
    }, [toggled]);

    const callback = () => {
        console.log('JJJJJJJJJJJJJJJjjjJJJJJJJJJJJJJJ : ' + toggled)
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (<>
        <MessageQueue messages={messages} removeMessage={removeMessage} />
        <label className='toggle_btn_label'>
            <input className='toggle_btn_input' type="checkbox" defaultChecked={isToggled} onChange={callback} />
            <span className='toggle_btn_span' />
        </label>
    </>
    )
};

export default ToggleBtn;