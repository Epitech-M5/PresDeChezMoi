import React, { useEffect, useState } from 'react';
// import { getAPI, postAPI, putAPI, deleteAPI } from '../../api.js'
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
// import { useSelector } from "react-redux";

const ToggleBtn = ({ toggled, onToggle }) => {

    const [isToggled, toggle] = useState(toggled)

    useEffect(() => {
        toggle(toggled);
    }, [toggled]);

    const handleToggle = () => {
        onToggle(!toggled);
    };

    return (
        <>
            <label className='toggle_btn_label'>
                <input className='toggle_btn_input' type="checkbox" checked={toggled} onChange={handleToggle} />
                <span className='toggle_btn_span' />
            </label>
        </>
    )
};

export default ToggleBtn;