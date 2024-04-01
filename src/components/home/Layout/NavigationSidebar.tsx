'use client'

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
import UserButton from './UserButton'
import { useState } from 'react'

const NavigationSidebar = ({user, error}: {user: User, error?: any}) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false);
  
  const switchOpen = () => {
    setOpen(!open)
  }

  let extraClass = ''
  let extraClassBlock = ''
  if (pathname.includes('/character')) {
    // should use fullSize and fullSizeBlock
    extraClass = ` ${styles.fullSize}`
    extraClassBlock = ` ${styles.fullSizeBlock}`
  }
  
  return (
    <>
      <div className={styles.sidebarBlock + extraClassBlock} />
      <section className={`${styles.sidebar}${!open ? ' ' + styles.closed : ''}${extraClass}`}>
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
        <UserButton user={user} />
        <button className={styles.sidebarButton}
          onClick={switchOpen}
        >
          { open ? <Left /> : <Right />}
        </button>
      </section>
    </>
  )
}

export default NavigationSidebar