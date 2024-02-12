import TreasureMap from '@/components/icons/TreasureMap'
import styles from './Layout.module.css'
import NavigationLink from './NavigationLink'
import Cowled from '@/components/icons/Cowled'
import Home from '@/components/icons/ui/Home'
import { usePathname } from 'next/navigation'
import CutDiamond from '@/components/icons/CutDiamond'
import Bookmarklet from '@/components/icons/Bookmarklet'

const NavigationSidebar = ({ user, handleLogout }: any) => {
  // get pathname
  const pathname = usePathname()
  console.log(pathname)
  return (
    <nav className={styles.nav}>
      <section className={styles.top}>
        <NavigationLink selected={pathname === '/'} href={'/'}><Home /> Inicio</NavigationLink>
        <NavigationLink selected={pathname === '/campaigns'} href={'/campaigns'}><TreasureMap /> Campañas</NavigationLink>
        <NavigationLink selected={pathname === '/characters'} href={'/characters'}><Cowled /> Personajes</NavigationLink>
        {/* <NavigationLink selected={pathname === '/sessions'} href={'/sessions'}>Sesiones</NavigationLink> */}
      </section>
      <section className={styles.bottom}>
        <NavigationLink selected={pathname === '/manuals'} href={'/manuals'}><Bookmarklet /> Manuales</NavigationLink>
        <NavigationLink selected={pathname === '/suscription'} href={'/suscription'}><CutDiamond /> Suscripción</NavigationLink>
        <hr />
        <div>Usuario: {user}</div>
        <div style={{color: 'var(--primary)', cursor: 'pointer'}} onClick={handleLogout}>Cerrar sesión</div>
      </section>
    </nav>
  )
}

export default NavigationSidebar