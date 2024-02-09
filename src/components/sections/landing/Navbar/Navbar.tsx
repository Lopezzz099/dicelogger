import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <section className={styles.container + ' section'}>
      <div className={styles.navbar + ' content'}>
        <div className={styles.logo}>
          Logo<br/>D&D
        </div>
        <div>
          Iniciar sesión
        </div>
      </div>
    </section>
  )
}

export default Navbar;