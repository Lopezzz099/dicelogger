'use client';

import styles from '@/components/home/Layout/Layout.module.css'
import NavigationSidebar from '@/components/home/Layout/NavigationSidebar';
import { Suspense, useState } from 'react';
import Loading from './loading';

type HomeLayoutProps = {
  children: React.ReactNode
}

const HomeLayout = ({ children }: HomeLayoutProps) => {

  const [open, setOpen] = useState(false);

  return (
    <main className={styles.layout}>
      <NavigationSidebar open={open} setOpen={setOpen} />
      <section className={styles.page}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </section>
    </main>
  )
}

export default HomeLayout