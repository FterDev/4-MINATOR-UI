
import React from 'react';
import './fminput.scss';

interface FMInputProps {
    title: string;
    name: string;
    placeholder?: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
}


const FMInput: React.FC<FMInputProps> = ({ title, name, placeholder, id, value, onChange }) => {
    return (
        <div className="fm-input">
            <label htmlFor={id}>{title}</label>
            <input
                type="text"
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};