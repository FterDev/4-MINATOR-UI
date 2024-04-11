
import React from 'react';
import './fminput.css';

interface FMInputProps {
    title: string;
    name: string;
    placeholder?: string;
    id: string;
    value: string;
    textAlign?: 'center' | 'left' | 'right';
    isErrored?: boolean;
    errorText?: string;
    onChange?: (value: string) => void;
}


const FMInput: React.FC<FMInputProps> = ({ title, name, placeholder, id, textAlign='left', isErrored=false, errorText, onChange }) => {
    return (
        <div className="fm-input">
            <label className='fm-input-label' htmlFor={id}>{title}</label>
            <input
                className={`fm-input-field fm-input-field-${textAlign} ${isErrored ? 'fm-input-field-error' : ''}`}
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
            />
            <label className='fm-input-error' htmlFor={id}>{errorText}</label>
        </div>
    );
};

export default FMInput;