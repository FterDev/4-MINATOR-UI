
import React from 'react';
import './fminput.css';

interface FMInputProps {
    title: string;
    name: string;
    placeholder?: string;
    id: string;
    value: string;
    textAlign?: 'center' | 'left' | 'right';
    type?: 'text' | 'password' | 'email';
    isErrored?: boolean;
    errorText?: string | null;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}


let FmInput: React.FC<FMInputProps> = ({ title, name, placeholder, id, textAlign='left', type='text' ,isErrored=false, errorText, onChange, onBlur }) => {
    return (
        <div className="fm-input">
            <label className='fm-input-label' htmlFor={id}>{title}</label>
            <input
                className={`fm-input-field fm-input-field-${textAlign} ${isErrored ? 'fm-input-field-error' : ''}`}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
                onBlur={(e) => onBlur && onBlur(e.target.value)}
            />
            <label className='fm-input-error' htmlFor={id}>{errorText}</label>
        </div>
    );
};

export default FmInput;