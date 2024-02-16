import TreasureMap from '@/components/icons/TreasureMap'
import styles from './Layout.module.css'
import NavigationLink from './NavigationLink'
import Cowled from '@/components/icons/Cowled'
import Home from '@/components/icons/ui/Home'
import { usePathname } from 'next/navigation'
import CutDiamond from '@/components/icons/CutDiamond'
import Bookmarklet from '@/components/icons/Bookmarklet'
import Logo from '@/components/icons/Logo'

const NavigationSidebar = ({ user, handleLogout }: any) => {
  // get pathname
  const pathname = usePathname()
  console.log(pathname)
  return (
    <section className={styles.sidebar}>
      <section className={styles.logo}>
        <span>
          <Logo />
        </span>
        <h2>Dicelogger</h2>
      </section>
      <hr />
      <nav className={styles.nav}>
        <div className={styles.top}>
          <NavigationLink selected={pathname === '/'} href={'/'}><Home /> Inicio</NavigationLink>
          <NavigationLink selected={pathname === '/campaigns'} href={'/campaigns'}><TreasureMap /> Campañas</NavigationLink>
          <NavigationLink selected={pathname === '/characters'} href={'/characters'}><Cowled /> Personajes</NavigationLink>
          {/* <NavigationLink selected={pathname === '/sessions'} href={'/sessions'}>Sesiones</NavigationLink> */}
        </div>
        <div className={styles.bottom}>
          <NavigationLink selected={pathname === '/manuals'} href={'/manuals'}><Bookmarklet /> Manuales</NavigationLink>
          <NavigationLink selected={pathname === '/suscription'} href={'/suscription'}><CutDiamond /> Suscripción</NavigationLink>
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
    </section>
  )
}

export default NavigationSidebar