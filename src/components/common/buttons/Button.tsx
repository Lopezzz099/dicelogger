import Link from 'next/link';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ className, children, onClick, type }: ButtonProps) => {
  const otherClass = className ? ` ${className}` : '';
  return <button type={type} onClick={onClick} className={`${styles.button}${otherClass}`}>{children}</button>;
}

export default Button;