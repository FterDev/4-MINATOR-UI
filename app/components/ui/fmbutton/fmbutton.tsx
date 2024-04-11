

interface FmButtonProps {
  text: string;
  type?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  onClick?: () => void;
}


const FmButton: React.FC<FmButtonProps> = ({ text, type = 'filled', color = 'primary', onClick }) => {
  return (
    <button
      className={`fm-button fm-button--${type} fm-button--${color}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FmButton;