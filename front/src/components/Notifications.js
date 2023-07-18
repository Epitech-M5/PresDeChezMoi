import { React, useEffect, useState } from 'react';

const Notifications = ({ message, removeMessage }) => {

    const [notif, setNotif] = useState();

    useEffect(() => {

        switch (message.type) {

            case 'success':
                document.querySelector('.toast').classList.add('success');
                return setNotif(<i class="fa-solid fa-circle-check"></i>);
            case 'info':
                document.querySelector('.toast').classList.add('info');
                return setNotif(<i class="fa-solid fa-circle-info"></i>);
            case 'error':
                document.querySelector('.toast').classList.add('error');
                return setNotif(<i class="fa-sharp fa-solid fa-ban"></i>);
        }


    }, [])

    return (
        <>
            <li className="toast">
                <div className="column">
                    {notif}
                    <span>{message.caption}</span>
                </div>
                <i className="fa-solid fa-xmark" onClick={() => { removeMessage(message.id) }}></i>
            </li >
        </>
    );
};

export default Notifications;