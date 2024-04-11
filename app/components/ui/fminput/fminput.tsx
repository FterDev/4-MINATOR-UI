
import React from 'react';
import './fminput.css';

interface FMInputProps {
    title: string;
    name: string;
    placeholder?: string;
    id: string;
    value: string;
    onChange?: (value: string) => void;
}


const FMInput: React.FC<FMInputProps> = ({ title, name, placeholder, id, onChange }) => {
    return (
        <div className="fm-input">
            <label className='fm-input-label' htmlFor={id}>{title}</label>
            <input
                className='fm-input-field'
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FMInput;