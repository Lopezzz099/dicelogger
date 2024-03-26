import Link from 'next/link';
import styles from './Button.module.css';


const Button = ({ className, children, onClick, type, disabled = false }: ButtonProps) => {
  const otherClass = className ? ` ${className}` : '';
  return <button disabled={disabled} type={type} onClick={onClick} className={`${styles.button}${otherClass}`}>{children}</button>;
}

export default Button;