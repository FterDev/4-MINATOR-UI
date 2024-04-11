
import React from 'react';
import './fminput.css';

interface FMInputProps {
    title: string;
    name: string;
    placeholder?: string;
    id: string;
    value: string;
    textAlign?: 'center' | 'left' | 'right';
    isPassword?: boolean;
    isErrored?: boolean;
    errorText?: string;
    onChange?: (value: string) => void;
}


const FMInput: React.FC<FMInputProps> = ({ title, name, placeholder, id, textAlign='left', isPassword=false ,isErrored=false, errorText, onChange }) => {
    return (
        <div className="fm-input">
            <label className='fm-input-label' htmlFor={id}>{title}</label>
            <input
                className={`fm-input-field fm-input-field-${textAlign} ${isErrored ? 'fm-input-field-error' : ''}`}
                type={isPassword ? 'password' : 'text'}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
            />
            <label className='fm-input-error' htmlFor={id}>{errorText}</label>
        </div>
    );
};

export default FMInput;