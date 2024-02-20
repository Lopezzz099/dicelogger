import TreasureMap from '@/components/icons/TreasureMap'
import styles from './Layout.module.css'
import NavigationLink from './NavigationLink'
import Cowled from '@/components/icons/Cowled'
import Home from '@/components/icons/ui/Home'
import { usePathname } from 'next/navigation'
import CutDiamond from '@/components/icons/CutDiamond'
import Bookmarklet from '@/components/icons/Bookmarklet'
import Logo from '@/components/icons/Logo'
import Left from '@/components/icons/ui/Left'
import Right from '@/components/icons/ui/Right'

const NavigationSidebar = ({ user, handleLogout, open, setOpen }: any) => {
  // get pathname
  const pathname = usePathname()

  const switchOpen = () => {
    setOpen(!open)
  }
  
  return (
    <section className={`${styles.sidebar}${!open ? ' ' + styles.closed : ''}`}>
      <section className={styles.logo}>
        <span>
          <Logo />
        </span>
        <h2>Dicelogger</h2>
      </section>
      <hr />
      <nav className={styles.nav}>
        <div className={styles.top}>
          <NavigationLink selected={pathname === '/'} href={'/'}><Home /> <span>Inicio</span></NavigationLink>
          <NavigationLink selected={pathname === '/campaigns'} href={'/campaigns'}><TreasureMap /> <span>Campañas</span></NavigationLink>
          <NavigationLink selected={pathname === '/characters'} href={'/characters'}><Cowled /> <span>Personajes</span></NavigationLink>
          {/* <NavigationLink selected={pathname === '/sessions'} href={'/sessions'}>Sesiones</NavigationLink> */}
        </div>
        <div className={styles.bottom}>
          <NavigationLink selected={pathname === '/manuals'} href={'/manuals'}><Bookmarklet /> <span>Manuales</span></NavigationLink>
          <NavigationLink selected={pathname === '/suscription'} href={'/suscription'}><CutDiamond /> <span>Suscripción</span></NavigationLink>
        </div>
      </nav>
      <hr />
      <section className={styles.user}>
        <span className={styles.userImage}>
          <img src="/user.png" alt={`Foto de ${user}`} />
        </span>
        <div>
          <p className={styles.userName}>{user}</p>
          <p className={styles.userEmail}>{user}@gmail.com</p>
        </div>
      </section>
      <button className={styles.sidebarButton}
        onClick={switchOpen}
      >
        { open ? <Left /> : <Right />}
      </button>
    </section>
  )
}

export default NavigationSidebar