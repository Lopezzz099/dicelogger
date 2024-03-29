import styles from '@/components/home/Layout/Layout.module.css'
import NavigationSidebar from '@/components/home/Layout/NavigationSidebar';
import { Suspense } from 'react';
import Loading from './loading';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import getUserData from '@/services/getUserData';

export const revalidate = 0

type HomeLayoutProps = {
  children: React.ReactNode
}

// const getUserData = async () => {
//   const response = await fetch(process.env.URL + "/api/my", {
//     headers: headers()
//   })
//   const data = await response.json()
//   if (!data.username) {
//     throw new Error(data.message || 'Something went wrong!')
//   }
//   return data
// }

const HomeLayout = async ({ children }: HomeLayoutProps) => {

  let error
  let user
  try {
    user = await getUserData(headers)
  } catch (error) {
    error = error
    // redirect('/landing')
  }

  return (
    <main className={styles.layout}>
      <NavigationSidebar error={error} user={user} />
      <section className={styles.page}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </section>
    </main>
  )
}

export default HomeLayout