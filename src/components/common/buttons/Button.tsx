import Link from 'next/link';
import style from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const LinkButton = ({ className, children, onClick }: ButtonProps) => {
  const otherClass = className ? ` ${className}` : '';
  return <button onClick={onClick} className={`${style.button}${otherClass}`}>{children}</button>;
}

export default LinkButton;