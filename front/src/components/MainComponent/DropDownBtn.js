import { React, useState } from 'react';

const DropDownBtn = (props) => {

    const [selectedItem, setSelectedItem] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleCheckboxChange = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
        console.log('item selected ' + item);

        handleToggle();

        props.onCheckboxChange(item);
    };

    return (
        <>
            <div className="wrapper_dropdown">
                <div className='container_dropdown' onClick={handleToggle}>
                    <h1>{props.text}</h1>
                    <i className={`fa-solid fa-greater-than ${isOpen ? 'fa-rotate-270' : 'fa-rotate-90'}`}></i>
                </div>
                {props.type === 'abs' && isOpen && (
                    <div className='items_dropdown'>
                        {props.items.map((item, index) => (
                            <div className="align_item_dropdown">
                                <li key={index}>
                                    <a>{item}</a>
                                    <input
                                        type='checkbox'
                                        checked={item === selectedItem}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                </li>
                            </div>
                        ))}
                    </div>
                )}
                {props.type === 'rela' && isOpen && (
                    <div className='items_dropdown relative'>
                        {props.items.map((item, index) => (
                            <div className="align_item_dropdown">
                                <li key={index}>
                                    <a>{item}</a>
                                    <input
                                        type='checkbox'
                                        checked={item === selectedItem}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                </li>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default DropDownBtn;