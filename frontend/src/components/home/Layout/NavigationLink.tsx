import Link from 'next/link'
import styles from './NavigationButton.module.css'

export type LinkProps = {
  children: React.ReactNode;
  className?: string;
  href: string;
  selected?: boolean;
}

const NavigationLink = ({ children, href, className, selected }: LinkProps) => {
  const selectedClass = selected ? ` ${styles.selected}` : '';
  const otherClass = className ? ` ${className}` : '';
  return <Link href={href} className={`${styles.button}${selectedClass}${otherClass}`}>{children}</Link>;
}

export default NavigationLink