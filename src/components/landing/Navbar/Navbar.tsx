import Logo from '@/components/icons/Logo';
import styles from './Navbar.module.css';
import LoginPopup from './LoginPopup';

const Navbar = () => {
  return (
    <section className={styles.container + ' section'}>
      <div className={styles.navbar + ' content'}>
        <div className={styles.logo}>
          <Logo size={'3em'} />
          <h1>Dicelogger</h1>
        </div>
        <LoginPopup />
      </div>
    </section>
  )
}

export default Navbar;