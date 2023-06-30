import React, { useEffect, useState } from 'react';

const Notifications = (props) => {

    const [notif, setNotif] = useState();

    useEffect(() => {

        switch (props.type) {
            case '1':
                return setNotif(
                    <li className="toast success">
                        <div className="column">
                            <i class="fa-solid fa-circle-check"></i>
                            <span>{props.text}</span>
                        </div>
                        <i class="fa-solid fa-xmark"></i>
                    </li>
                );
            case '2':
                return setNotif(
                    <li className="toast info">
                        <div className="column">
                            <i class="fa-solid fa-circle-info"></i>
                            <span>{props.text}</span>
                        </div>
                        <i class="fa-solid fa-xmark"></i>
                    </li>
                );
            case '3':
                return setNotif(
                    <li className="toast warning">
                        <div className="column">
                            <i class="fa-sharp fa-solid fa-circle-exclamation"></i>
                            <span>{props.text}</span>
                        </div>
                        <i class="fa-solid fa-xmark"></i>
                    </li>
                );
            case '4':
                return setNotif(
                    <li className="toast danger">
                        <div className="column">
                            <i class="fa-sharp fa-solid fa-ban"></i>
                            <span>{props.text}</span>
                        </div>
                        <i class="fa-solid fa-xmark"></i>
                    </li>
                );

        }

    }, [])

    return (
        <>

            {notif}

        </>
    );
};

export default Notifications;