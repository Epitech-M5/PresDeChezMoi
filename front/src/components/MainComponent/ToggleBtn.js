import React, { useState } from 'react';

const ToggleBtn = ({ toggled, onClick }) => {

    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <label className='toggle_btn_label'>
            <input className='toggle_btn_input' type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className='toggle_btn_span' />
        </label>
    )
};

export default ToggleBtn;