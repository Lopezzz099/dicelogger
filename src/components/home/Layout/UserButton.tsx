'use client'

import Settings from '@/components/icons/ui/Settings';
import styles from './Layout.module.css';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logout from '@/components/icons/ui/Logout';
import Person from '@/components/icons/ui/Person';

const UserButton = () => {

  const router = useRouter()

  const [user, setUser] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (!user) {
      redirect('/landing');
    }
    setUser(user);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    router.push('/landing');
  }

  const handleOpen = () => {
    setOpen(!open);
  }

  return (
    <>
      <button className={styles.user} onClick={handleOpen}>
        <span className={styles.userImage}>
          <img src="/user.png" alt={`Foto de ${user}`} />
        </span>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user}</p>
          <p className={styles.userEmail}>{user}@gmail.com</p>
        </div>
      </button>
      <div className={styles.userPopup + (!open ? ` ${styles.userPopupClosed}` : '')}>
        <a href="/profile"><Person /> Perfil</a>
        <a href="/settings"><Settings /> Configuración</a>
        <button onClick={handleLogout}><Logout /> Cerrar sesión</button>
      </div>
    </>
  )
}

export default UserButton;