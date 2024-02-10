import Logo from '@/components/icons/Logo';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <section className={styles.container + ' section'}>
      <div className={styles.navbar + ' content'}>
        <div className={styles.logo}>
          <Logo />
          <h1>Dicelogger</h1>
        </div>
        <div>
          Iniciar sesión
        </div>
      </div>
    </section>
  )
}

export default Navbar;