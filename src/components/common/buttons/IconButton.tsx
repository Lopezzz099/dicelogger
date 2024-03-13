import styles from './IconButton.module.css'

type IconButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}

const IconButton = ({ icon, onClick, primary }: IconButtonProps) => {
  return (
    <button className={`${styles.button}${primary ? ' ' + styles.primary : ''}`}
    onClick={onClick}>
      {icon}
    </button>
  )
}

export default IconButton