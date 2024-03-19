import Link from 'next/link';
import styles from './Button.module.css';


const Button = ({ className, children, onClick, type }: ButtonProps) => {
  const otherClass = className ? ` ${className}` : '';
  return <button type={type} onClick={onClick} className={`${styles.button}${otherClass}`}>{children}</button>;
}

export default Button;