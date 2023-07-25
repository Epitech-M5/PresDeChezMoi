import React, { useState } from 'react';

const ToggleBtn = ({ toggled, onToggle }) => {

    const [isToggled, toggle] = useState(toggled)

    const handleToggle = () => {
        onToggle(!toggled);
    };

    return (
        <label className='toggle_btn_label'>
            <input className='toggle_btn_input' type="checkbox" checked={toggled} onChange={handleToggle} />
            <span className='toggle_btn_span' />
        </label>
    )
};

export default ToggleBtn;