import style from './Button.module.css';

export type ButtonProps = {
  className: string;
}

const Button = ({ className }: ButtonProps) => {
  const otherClass = className ? ` ${className}` : '';
  return <button className={`${style.button}${otherClass}`}>Click me</button>;
}

export default Button;