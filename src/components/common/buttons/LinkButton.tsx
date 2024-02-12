import Link from 'next/link';
import style from './Button.module.css';

export type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const LinkButton = ({ className, href, children }: LinkProps) => {
  const otherClass = className ? ` ${className}` : '';
  return <Link href={href} className={`${style.button}${otherClass}`}>{children}</Link>;
}

export default LinkButton;