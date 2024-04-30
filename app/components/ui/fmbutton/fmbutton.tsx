
import React from 'react';
import './fmbutton.css';

interface FmButtonProps {
  text: string;
  type?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
  onClick?: () => void;
}


let FmButton: React.FC<FmButtonProps> = ({ text, type = 'filled', color = 'primary', className, onClick }) => {
  return (
    <button
      className={`fm-button fm-button-${type}-${color} fm-button-${type}-hover ${className}` }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FmButton;