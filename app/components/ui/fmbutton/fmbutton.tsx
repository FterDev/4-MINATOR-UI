
import React from 'react';
import './fmbutton.css';

interface FmButtonProps {
  text?: React.ReactNode;

  type?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'danger' | 'success';
  submmit?: boolean;
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}


let FmButton: React.FC<FmButtonProps> = ({ text, type = 'filled', color = 'primary', submmit, className, isDisabled, onClick }) => {
  return (
    <button
      type={submmit ? 'submit' : 'button'}
      className={`fm-button fm-button-${type}-${color} fm-button-${type}-hover ${className}` }
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default FmButton;