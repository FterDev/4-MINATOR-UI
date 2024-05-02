
import React from 'react';
import './fmbutton.css';

interface FmButtonProps {
  text: React.ReactNode;

  type?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  submmit?: boolean;
  className?: string;
  onClick?: () => void;
}


let FmButton: React.FC<FmButtonProps> = ({ text, type = 'filled', color = 'primary', submmit, className, onClick }) => {
  return (
    <button
      type={submmit ? 'submit' : 'button'}
      className={`fm-button fm-button-${type}-${color} fm-button-${type}-hover ${className}` }
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FmButton;