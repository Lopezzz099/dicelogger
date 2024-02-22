'use client';

import styles from '@/components/home/Layout/Layout.module.css'
import NavigationSidebar from '@/components/home/Layout/NavigationSidebar';
import { useState } from 'react';

type HomeLayoutProps = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  const [open, setOpen] = useState(false);

  return (
    <main className={styles.layout}>
      <NavigationSidebar open={open} setOpen={setOpen} />
      <section className={styles.page}>
        {children}
      </section>
    </main>
  )
}

export default HomeLayout