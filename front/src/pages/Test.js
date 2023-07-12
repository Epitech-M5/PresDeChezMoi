import { React, useState } from 'react';
import DropDownBtn from '../components/MainComponent/DropDownBtn';


const Test = () => {

    const [selectedValue, setSelectedValue] = useState(null);

    const handleCheckboxChange = (item) => {
        setSelectedValue(item);
        console.log('Selected value in parent component: ' + item);
    };

    return (
        <div className='center'>
            <DropDownBtn text="Type de post" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion']} onCheckboxChange={handleCheckboxChange} />
            <DropDownBtn text="Type de post" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion']} onCheckboxChange={handleCheckboxChange} />
            <DropDownBtn text="Type de post" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion']} onCheckboxChange={handleCheckboxChange} />
            <DropDownBtn text="Type de post" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion']} onCheckboxChange={handleCheckboxChange} />
            <DropDownBtn text="Type de post" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion']} onCheckboxChange={handleCheckboxChange} />
        </div>
    );
};

export default Test;