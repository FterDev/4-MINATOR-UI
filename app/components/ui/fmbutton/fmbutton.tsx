
import React from 'react';
import './fmbutton.css';

interface FmButtonProps {
  text: string;
  type?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  onClick?: () => void;
}


const FmButton: React.FC<FmButtonProps> = ({ text, type = 'filled', color = 'primary', onClick }) => {
  return (
    <button
      className={`fm-button fm-button-${type}-${color} fm-button-${type}-hover`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FmButton;