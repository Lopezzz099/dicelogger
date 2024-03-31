import styles from '@/components/home/Layout/Layout.module.css'
import NavigationSidebar from '@/components/home/Layout/NavigationSidebar';
import { Suspense } from 'react';
import Loading from './loading';
import { redirect } from 'next/navigation';
import getUserData from '@/services/getUserData';
import { cookies } from 'next/headers';

export const revalidate = 0

type HomeLayoutProps = {
  children: React.ReactNode
}

const HomeLayout = async ({ children }: HomeLayoutProps) => {

  let user
  try {
    user = await getUserData(cookies)    
  } catch (error) {
    redirect('/landing')
  }

  return (
    <main className={styles.layout}>
      <NavigationSidebar user={user} />
      <section className={styles.page}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </section>
    </main>
  )
}

export default HomeLayout