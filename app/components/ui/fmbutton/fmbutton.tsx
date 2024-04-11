

interface FmButtonProps {
  text: string;
  type?: 'filled' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  onClick?: () => void;
}