'use client';

import { redirect, useRouter } from 'next/navigation';
import styles from '@/components/home/Layout/Layout.module.css'
import NavigationSidebar from '@/components/home/Layout/NavigationSidebar';
import { useEffect, useState } from 'react';

type HomeLayoutProps = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  const router = useRouter()

  const [user, setUser] = useState('');

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

  const props = {
    user,
    handleLogout
  }

  const [open, setOpen] = useState(true);

  return (
    <main className={styles.layout}>
      <NavigationSidebar open={open} setOpen={setOpen} user={user} handleLogout={handleLogout} />
      <section className={styles.page}>
        {children}
      </section>
    </main>
  )
}

export default HomeLayout