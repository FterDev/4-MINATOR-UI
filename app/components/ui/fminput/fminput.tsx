
import React from 'react';
import './fminput.css';

interface FMInputProps {
    title: string;
    name: string;
    placeholder?: string;
    id: string;
    value: string;
    textAlign?: 'center' | 'left' | 'right';
    onChange?: (value: string) => void;
}


const FMInput: React.FC<FMInputProps> = ({ title, name, placeholder, id, textAlign='left', onChange }) => {
    return (
        <div className="fm-input">
            <label className='fm-input-label' htmlFor={id}>{title}</label>
            <input
                className={`fm-input-field fm-input-field-${textAlign}`}
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FMInput;